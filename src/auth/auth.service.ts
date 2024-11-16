import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to MongoDB');
  }

  register() {
    return 'register';
  }

  login() {
    return 'login';
  }

  verify() {
    return 'verify';
  }
}
