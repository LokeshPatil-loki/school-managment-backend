import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './providers/exam.service';
import { FindExamsProvider } from './providers/find-exams.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService, FindExamsProvider],
  imports: [PaginationModule],
})
export class ExamModule {}
