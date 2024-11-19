import { Module } from '@nestjs/common';
import { StudentsService } from './providers/students.service';
import { StudentsController } from './students.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { FindStudentsProvider } from './providers/find-students.provider';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, FindStudentsProvider],
  imports: [PaginationModule],
})
export class StudentsModule {}
