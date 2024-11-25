import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginAttempt, PasswordReset, Role, Session, User } from './entities';
import { JwtStrategy } from './strategies';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Session,
      LoginAttempt,
      PasswordReset,
      Role,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    AuthModule,
    AuthService,
  ],
})
export class AuthModule {}
