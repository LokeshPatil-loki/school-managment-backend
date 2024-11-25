import { Injectable } from '@nestjs/common';
import { GetClassesDto } from '../dto/get-classes.dto';
import { FindClassesProvider } from './find-classes.provider';

@Injectable()
export class ClassesService {
  constructor(private readonly findClassesProvider: FindClassesProvider) {}
  async findClasses(query: GetClassesDto) {
    return await this.findClassesProvider.findClasses(query);
  }
}
