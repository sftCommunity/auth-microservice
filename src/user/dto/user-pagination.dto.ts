import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class UserPaginationDto extends PaginationDto {
  @IsOptional()
  is_active?: boolean;
}
