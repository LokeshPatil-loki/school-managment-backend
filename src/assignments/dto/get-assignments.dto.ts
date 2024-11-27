import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class GetAssignmentsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  classId?: number;
}
