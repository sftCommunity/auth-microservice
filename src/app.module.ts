import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SeedModule } from './seed/seed.module';
import { SessionModule } from './session/session.module';
import { envs } from './config';

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
    SeedModule,
    RoleModule,
    SessionModule,
    PermissionModule,
  ],
})
export class AppModule {}
