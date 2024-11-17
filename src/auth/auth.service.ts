import {
  HttpStatus,
  Injectable,
  Logger,
  type OnModuleInit,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config';
import { JwtPayload } from './inferfaces/jwt-payload.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to MongoDB');
  }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (user) throw new RpcException('User already exists');

      const newUser = await this.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
          name,
        },
      });

      const { password: _, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
        token: await this.signJWT(userWithoutPassword),
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (!user)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid credentials',
        });

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid credentials',
        });

      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token: await this.signJWT(userWithoutPassword),
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user,
        token: await this.signJWT(user),
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }
  }
}
