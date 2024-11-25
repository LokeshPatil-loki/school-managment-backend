import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './providers/lessons.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { FindLessonsProvider } from './providers/find-lessons.provider';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, FindLessonsProvider],
  imports: [PaginationModule],
})
export class LessonsModule {}
