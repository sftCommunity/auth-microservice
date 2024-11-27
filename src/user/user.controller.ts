import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserPaginationDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.find.all')
  findAll(@Payload() userPaginationDto: UserPaginationDto) {
    return this.userService.findAll(userPaginationDto);
  }

  @MessagePattern('user.find.one')
  findOne(@Payload() term: string) {
    return this.userService.findOne(term);
  }
}
