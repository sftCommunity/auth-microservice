import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { UpdateUserDto, UserPaginationDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const { email } = registerUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user)
      throw new RpcException({
        status: HttpStatus.CONFLICT,
        message: `User with email ${email} already exists`,
      });

    try {
      const user = this.userRepository.create(registerUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(userPaginationDto: UserPaginationDto) {
    const { limit = 10, page = 1, is_active = true } = userPaginationDto;
    try {
      const total = await this.userRepository.count();
      return {
        data: await this.userRepository.find({
          take: limit,
          skip: (page - 1) * limit,
          where: {
            is_active,
          },
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

  async findOne(term: string) {
    let user: User;
    try {
      if (isUUID(term)) {
        user = await this.userRepository.findOne({
          where: { id: term },
        });
      } else if (isEmail(term)) {
        user = await this.userRepository.findOne({
          where: { email: term },
        });
      } else {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        user = await queryBuilder
          .where(`UPPER(name) = :name`, {
            name: term.toUpperCase(),
          })
          .getOne();
      }

      if (!user) throw new RpcException(`User with term ${term} not found`);

      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, ...to_update } = updateUserDto;

    try {
      const user = await this.findOne(id);
      const { affected } = await this.userRepository.update(id, to_update);
      if (affected === 0)
        throw new RpcException(`User with id ${id} not updated`);
      return { ...user, ...to_update, id } as User;
    } catch (error) {
      if (error.code === '23505')
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          message: `User with email ${to_update.email} already exists`,
        });
      throw new RpcException(error);
    }
  }

  async delete(id: string) {
    const { is_active } = await this.findOne(id);

    if (!is_active)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `User with id ${id} is already deleted`,
      });

    try {
      const user = await this.update({ id, is_active: false });
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
