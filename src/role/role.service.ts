import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const new_role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(new_role);
      return new_role;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(term: string) {
    let role: Role;
    try {
      if (isNaN(+term)) {
        const queryBuilder = this.roleRepository.createQueryBuilder('role');
        role = await queryBuilder
          .where('UPPER(role_name) = :role_name', {
            role_name: term.toUpperCase(),
          })
          .leftJoinAndSelect('role.permissions', 'permissions')
          .getOne();
      } else {
        role = await this.roleRepository.findOne({
          where: { id: +term },
          relations: ['permissions'],
        });
      }

      if (!role) throw new RpcException(`Role with term ${term} not found`);
      return role;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    try {
      const total = await this.roleRepository.count();
      return {
        data: await this.roleRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          relations: ['permissions'],
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

  async delete(term: string) {
    const role = await this.findOne(term);
    await this.roleRepository.delete({ id: role.id });
    return {
      status: HttpStatus.ACCEPTED,
      message: `Deleted role ${role.name}`,
    };
  }

  async deleteAllRoles() {
    const query = this.roleRepository.createQueryBuilder('role');
    try {
      const { affected } = await query.delete().where({}).execute();
      return {
        status: HttpStatus.ACCEPTED,
        message: `Deleted ${affected} roles`,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
