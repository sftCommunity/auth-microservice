import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto';
import { Repository } from 'typeorm';

import { CreatePermissionDto } from './dto';
import { Permission } from './entities';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findOne(term: string) {
    let permission: Permission;
    try {
      if (isNaN(+term)) {
        const queryBuilder =
          this.permissionRepository.createQueryBuilder('permission');
        permission = await queryBuilder
          .where('UPPER(permission_name) = :permission_name', {
            permission_name: term.toUpperCase(),
          })
          .leftJoinAndSelect('permission.roles', 'roles')
          .getOne();
      } else {
        permission = await this.permissionRepository.findOne({
          where: { id: +term },
          relations: ['roles'],
        });
      }

      if (!permission)
        throw new RpcException(`Permission with term ${term} not found`);

      return permission;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAllPermissions(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    try {
      const total = await this.permissionRepository.count();
      return {
        data: await this.permissionRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          relations: ['roles'],
        }),
        meta: {
          page: page,
          lastPage: Math.ceil(total / limit),
          total,
        },
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const { name } = createPermissionDto;
    try {
      return await this.permissionRepository.save(createPermissionDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async delete(term: string) {
    const permission = await this.findOne(term);
    await this.permissionRepository.delete({ id: permission.id });
    return {
      status: HttpStatus.ACCEPTED,
      message: `Deleted permission ${permission.name}`,
    };
  }

  async deleteAll() {
    const query = this.permissionRepository.createQueryBuilder('permission');
    try {
      const { affected } = await query.delete().where({}).execute();
      return {
        status: HttpStatus.ACCEPTED,
        message: `Deleted ${affected} permissions`,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
