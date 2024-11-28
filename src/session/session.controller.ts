import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @MessagePattern('session.create')
  create(@Payload() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(
      createSessionDto.user_id,
      createSessionDto,
    );
  }
}
