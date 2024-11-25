import { Injectable } from '@nestjs/common';
import { GetLessonsDto } from '../dto/get-lessons.dto';
import { FindLessonsProvider } from './find-lessons.provider';

@Injectable()
export class LessonsService {
  constructor(private readonly findLessonsProvider: FindLessonsProvider) {}

  async findLessons(query: GetLessonsDto) {
    return await this.findLessonsProvider.findLessons(query);
  }
}
