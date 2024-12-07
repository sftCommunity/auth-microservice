import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  old_password: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  new_password: string;
}
