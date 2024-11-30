import { Injectable } from '@nestjs/common';
import { FindExamsProvider } from './find-exams.provider';
import { GetExamsDto } from '../dto/get-exams.dto';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class ExamService {
  constructor(private readonly findExamsProvider: FindExamsProvider) {}
  async findExams(query: GetExamsDto, currentUser: CurrentUser) {
    return await this.findExamsProvider.findExams(query, currentUser);
  }
}
