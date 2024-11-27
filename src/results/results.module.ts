import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './providers/results.service';
import { FindResultsProvider } from './providers/find-results.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService, FindResultsProvider],
  imports: [PaginationModule],
})
export class ResultsModule {}
