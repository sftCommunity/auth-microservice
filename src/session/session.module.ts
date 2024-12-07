import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities';

import { Session } from './entities/session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [TypeOrmModule.forFeature([Session, User])],
})
export class SessionModule {}
