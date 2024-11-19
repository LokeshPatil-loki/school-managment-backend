import { Injectable } from '@nestjs/common';
import { GetStudentsDto } from '../dto/get-students.dto';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class FindStudentsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findStudents(query: GetStudentsDto) {
    const where: Prisma.StudentWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'teacherId': {
          where.class = {
            lessons: { some: { teacherId: query.teacherId } },
          };
          break;
        }
        case 'search': {
          where.name = { contains: query.search, mode: 'insensitive' };
          break;
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        include: { results: true, Parent: true, class: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.student.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Student>(
      results,
      count,
      query,
    );
  }
}
