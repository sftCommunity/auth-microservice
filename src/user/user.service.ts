import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { UserPaginationDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
    } catch (e) {
      throw new RpcException(e);
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
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
