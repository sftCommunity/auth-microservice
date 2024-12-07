import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @MessagePattern('seed.execute')
  async executeSeed() {
    return this.seedService.executeSeed();
  }
}
