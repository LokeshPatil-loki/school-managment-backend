import { Controller, Get, Query } from '@nestjs/common';
import { ResultsService } from './providers/results.service';
import { GetResult } from '@prisma/client/runtime/library';
import { GetResultsDto } from './dto/get-results.dto';
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findResults(@Query() query: GetResultsDto) {
    return this.resultsService.findResults(query);
  }
}
