import { Injectable } from '@nestjs/common';
import { FindResultsProvider } from './find-results.provider';
import { GetResult } from '@prisma/client/runtime/library';
import { GetResultsDto } from '../dto/get-results.dto';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class ResultsService {
  constructor(private readonly findResultsProvider: FindResultsProvider) {}
  async findResults(query: GetResultsDto, currentUser: CurrentUser) {
    return await this.findResultsProvider.findResults(query, currentUser);
  }
}
