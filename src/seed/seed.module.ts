import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Session } from 'src/session/entities';
import { User } from 'src/user/entities';

import { AuthModule } from '../auth/auth.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService, AuthService],
  imports: [AuthModule, TypeOrmModule.forFeature([User, Session])],
})
export class SeedModule {}
