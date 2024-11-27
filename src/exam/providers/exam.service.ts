import { Injectable } from '@nestjs/common';
import { FindExamsProvider } from './find-exams.provider';
import { GetExamsDto } from '../dto/get-exams.dto';

@Injectable()
export class ExamService {
  constructor(private readonly findExamsProvider: FindExamsProvider) {}
  async findExams(query: GetExamsDto) {
    return await this.findExamsProvider.findExams(query);
  }
}
