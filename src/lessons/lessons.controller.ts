import { Controller, Get, Query } from '@nestjs/common';
import { LessonsService } from './providers/lessons.service';
import { GetLessonsDto } from './dto/get-lessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly studentsService: LessonsService) {}
  @Get()
  findAll(@Query() query: GetLessonsDto) {
    return this.studentsService.findLessons(query);
  }
}
