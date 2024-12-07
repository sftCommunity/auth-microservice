import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';

import { LoginUserDto, RegisterUserDto } from './dto';
import { VerifyTokenResponse } from './interfaces';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (user) throw new RpcException('User already exists');

      const new_user = this.userRepository.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(new_user);
      delete new_user.password;

      return {
        ...new_user,
        token: await this.signJWT({
          id: new_user.id,
          name: new_user.name,
          email: new_user.email,
        }),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });

      if (!user) throw new RpcException('Invalid email');

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) throw new RpcException('Invalid password');

      delete user.password;

      return {
        user: user,
        token: await this.signJWT({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user,
        token: await this.signJWT(user),
      };
    } catch {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }
  }
}
