import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GetTeachersDto } from '../dto/get-teachers.dto';
import { Prisma, Teacher } from '@prisma/client';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FindTeachersProvider } from './find-teachers.provider';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findTeachersProvider: FindTeachersProvider,
  ) {}
  async findTeachers(query: GetTeachersDto) {
    return await this.findTeachersProvider.findTeachers(query);
  }

  async count() {
    return await this.prisma.teacher.count();
  }
}
