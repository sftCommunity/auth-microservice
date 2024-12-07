import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';

import { CreatePermissionDto } from './dto';
import { PermissionService } from './permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @MessagePattern('permission.find.one')
  findOnePermission(@Payload() term: string) {
    return this.permissionService.findOne(term);
  }

  @MessagePattern('permission.find.all')
  findAllPermissions(@Payload() paginationDto: PaginationDto) {
    return this.permissionService.findAllPermissions(paginationDto);
  }

  @MessagePattern('permission.create')
  createPermission(@Payload() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @MessagePattern('permission.delete.one')
  deletePermission(@Payload() term: string) {
    return this.permissionService.delete(term);
  }

  @MessagePattern('permission.delete.all')
  deleteAllPermissions() {
    return this.permissionService.deleteAll();
  }
}
