import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

export class GetTeachersDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  classId?: number;
}
