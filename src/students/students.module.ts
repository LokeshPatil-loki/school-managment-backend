import { Module } from '@nestjs/common';
import { StudentsService } from './providers/students.service';
import { StudentsController } from './students.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [PaginationModule],
})
export class StudentsModule {}
