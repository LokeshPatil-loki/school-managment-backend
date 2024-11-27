import { Controller, Get, Query } from '@nestjs/common';
import { GetAssignmentsDto } from './dto/get-assignments.dto';
import { query } from 'express';
import { AssignmentsService } from './providers/assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findExamService(@Query() query: GetAssignmentsDto) {
    return this.assignmentsService.findExams(query);
  }
}
