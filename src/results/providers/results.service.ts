import { Injectable } from '@nestjs/common';
import { FindResultsProvider } from './find-results.provider';
import { GetResult } from '@prisma/client/runtime/library';
import { GetResultsDto } from '../dto/get-results.dto';

@Injectable()
export class ResultsService {
  constructor(private readonly findResultsProvider: FindResultsProvider) {}
  async findResults(query: GetResultsDto) {
    return await this.findResultsProvider.findResults(query);
  }
}
