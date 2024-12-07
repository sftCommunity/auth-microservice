import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page = 1;

  @IsPositive()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit = 10;
}
