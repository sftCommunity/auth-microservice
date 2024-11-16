import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'register';
  }

  login() {
    return 'login';
  }

  verify() {
    return 'verify';
  }
}
