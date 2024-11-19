import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

export class GetParentsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
