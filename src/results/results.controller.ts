import { Controller, Get, Query } from '@nestjs/common';
import { ResultsService } from './providers/results.service';
import { GetResult } from '@prisma/client/runtime/library';
import { GetResultsDto } from './dto/get-results.dto';
import { ActiveUserDecorator } from 'src/clerk/decorators/active-user.decorator.decorator';
import { CurrentUser } from 'src/common/type/current-user.interface';
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findResults(
    @Query() query: GetResultsDto,
    @ActiveUserDecorator() currentUser: CurrentUser,
  ) {
    return this.resultsService.findResults(query, currentUser);
  }
}
