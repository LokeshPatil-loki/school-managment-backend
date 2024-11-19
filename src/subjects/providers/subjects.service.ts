import { Injectable } from '@nestjs/common';
import { FindSubjectsProvider } from './find-subjects.provider';
import { GetSubjectsDto } from '../dtos/get-subjects.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly findSubjectsProvider: FindSubjectsProvider) {}

  async findSubjects(query: GetSubjectsDto) {
    return await this.findSubjectsProvider.findSubjects(query);
  }
}
