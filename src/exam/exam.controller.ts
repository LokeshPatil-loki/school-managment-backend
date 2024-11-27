import { Controller, Get, Query } from '@nestjs/common';
import { ExamService } from './providers/exam.service';
import { GetExamsDto } from './dto/get-exams.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  findExamService(@Query() getExamServiceDto: GetExamsDto) {
    return this.examService.findExams(getExamServiceDto);
  }
}
