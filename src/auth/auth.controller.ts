import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  register() {
    return this.authService.register();
  }

  @MessagePattern('auth.login.user')
  login() {
    return this.authService.login();
  }

  @MessagePattern('auth.verify.user')
  verify() {
    return this.authService.verify();
  }
}
