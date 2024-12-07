import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('role.create')
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @MessagePattern('role.find.one')
  findOne(@Payload() term: string) {
    return this.roleService.findOne(term);
  }

  @MessagePattern('role.find.all')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.roleService.findAll(paginationDto);
  }

  @MessagePattern('role.delete.one')
  delete(@Payload() term: string) {
    return this.roleService.delete(term);
  }

  @MessagePattern('role.delete.all')
  deleteAll() {
    return this.roleService.deleteAllRoles();
  }
}
