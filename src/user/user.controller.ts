import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.find.all')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }
}
