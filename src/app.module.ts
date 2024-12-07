import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { envs } from './config';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SeedModule } from './seed/seed.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.hostDb,
      port: envs.portDb,
      database: envs.postgresDb,
      username: envs.postgresUser,
      password: envs.postgresPassword,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SeedModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
