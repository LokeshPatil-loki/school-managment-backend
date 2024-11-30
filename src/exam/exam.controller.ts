import { Controller, Get, Query } from '@nestjs/common';
import { ExamService } from './providers/exam.service';
import { GetExamsDto } from './dto/get-exams.dto';
import { ActiveUserDecorator } from 'src/clerk/decorators/active-user.decorator.decorator';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  findExamService(
    @Query() getExamServiceDto: GetExamsDto,
    @ActiveUserDecorator() currentUser: CurrentUser,
  ) {
    return this.examService.findExams(getExamServiceDto, currentUser);
  }
}
