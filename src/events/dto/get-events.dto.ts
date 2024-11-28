import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class GetEventsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  classId?: number;
}
