import {
  HttpStatus,
  Injectable,
  Logger,
  type OnModuleInit,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to MongoDB');
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
        token: 'ABCD1234',
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
        token: 'ABCD1234',
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  verify() {
    return 'verify';
  }
}
