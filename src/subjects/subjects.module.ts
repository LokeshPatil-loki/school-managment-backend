import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './providers/subjects.service';
import { FindSubjects } from './providers/find-subjects.provider';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, FindSubjects],
})
export class SubjectsModule {}
