import { Controller, Get, Query } from '@nestjs/common';
import { SubjectsService } from './providers/subjects.service';
import { GetSubjectsDto } from './dtos/get-subjects.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
  @Get()
  findSubjects(@Query() query: GetSubjectsDto) {
    return this.subjectsService.findSubjects(query);
  }
}
