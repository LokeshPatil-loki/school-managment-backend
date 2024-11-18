import { Controller, Get, Query } from '@nestjs/common';
import { TeachersService } from './providers/teachers.service';
import { GetTeachersDto } from './dto/get-teachers.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(@Query() teachersQuery: GetTeachersDto) {
    return this.teachersService.findAll(teachersQuery);
  }
}
