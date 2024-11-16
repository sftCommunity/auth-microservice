import {
  Injectable,
  Logger,
  type OnModuleInit
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';

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
          password,
          name,
        },
      });

      return {
        user: newUser,
        token: 'ABCD1234',
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  login() {
    return 'login';
  }

  verify() {
    return 'verify';
  }
}
