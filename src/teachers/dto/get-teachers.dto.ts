import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

export class GetTeachersDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  classId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
