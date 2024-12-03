import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { GetStudentsDto } from '../dto/get-students.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FindStudentsProvider } from './find-students.provider';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
    private readonly findStudentsProvider: FindStudentsProvider,
  ) {}

  async findStudents(query: GetStudentsDto) {
    return await this.findStudentsProvider.findStudents(query);
  }

  async count() {
    return await this.prisma.student.count();
  }

  async countBySex() {
    const counts = await this.prisma.student.groupBy({
      by: ['sex'],
      _count: true,
    });

    return {
      male: counts.filter((item) => item.sex === 'MALE')[0]._count,
      female: counts.filter((item) => item.sex === 'FEMALE')[0]._count,
    };
  }
}
