import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Session } from 'src/session/entities';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';

import { initialData } from './data/data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly authService: AuthService,
  ) {}

  async executeSeed(): Promise<{ status: number; message: string }> {
    try {
      await this.deleteTables();
      await this.insertUsers();
      // await this.insertSessions(token);
      return {
        status: HttpStatus.OK,
        message: 'Seed executed successfully',
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  private async deleteTables(): Promise<void> {
    await this.sessionRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }

  private async insertUsers(): Promise<void> {
    const seedUsers = initialData.users;
    const users: User[] = [];
    for (const user of seedUsers) {
      users.push(this.userRepository.create(user));
    }
    await this.userRepository.save(users);
  }

  // private async insertSessions(token: string): Promise<Session> {
  //   const { user, token: token_signed } =
  //     await this.authService.verifyToken(token);

  // const session = this.sessionRepository.create({
  //   user_id: user.id,
  //   token: token_signed,
  // });
  // const sessionSaved = await this.sessionRepository.save(session);
  // return sessionSaved;

  // }
}
