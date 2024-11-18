import { Module } from '@nestjs/common';
import { StudentsService } from './providers/students.service';
import { StudentsController } from './students.controller';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
