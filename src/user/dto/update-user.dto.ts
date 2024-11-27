import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsString()
  @IsUUID()
  id: string;
}
