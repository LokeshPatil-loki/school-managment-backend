import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './providers/subjects.service';
import { FindSubjectsProvider } from './providers/find-subjects.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, FindSubjectsProvider],
  imports: [PaginationModule],
})
export class SubjectsModule {}
