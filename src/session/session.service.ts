import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  create(user_id: string, createSessionDto: CreateSessionDto) {
    const session = this.sessionRepository.create({
      user_id,
      ...createSessionDto,
    });
    return this.sessionRepository.save(session);
  }
}
