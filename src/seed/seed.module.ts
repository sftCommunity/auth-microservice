import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User } from 'src/auth/entities';
import { AuthModule } from '../auth/auth.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, TypeOrmModule.forFeature([User, Session])],
})
export class SeedModule {}
