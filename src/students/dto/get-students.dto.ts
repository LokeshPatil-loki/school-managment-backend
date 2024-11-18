import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

export class GetStudentsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;
}
