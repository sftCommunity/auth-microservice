import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  token: string;

  @IsString()
  @IsNotEmpty()
  user_agent: string;

  @IsString()
  @IsNotEmpty()
  ip_address: string;

  @IsOptional()
  expires_at: Date;

  @IsBoolean()
  @IsOptional()
  is_active = true;
}
