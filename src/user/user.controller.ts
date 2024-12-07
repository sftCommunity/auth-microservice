import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto } from 'src/auth/dto';

import { UpdateUserDto, UserPaginationDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.create')
  create(@Payload() registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }

  @MessagePattern('user.find.all')
  findAll(@Payload() userPaginationDto: UserPaginationDto) {
    return this.userService.findAll(userPaginationDto);
  }

  @MessagePattern('user.find.one')
  findOne(@Payload() term: string) {
    return this.userService.findOne(term);
  }

  @MessagePattern('user.update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @MessagePattern('user.delete')
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
}
