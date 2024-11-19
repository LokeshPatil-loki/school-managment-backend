import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Subject, Prisma } from '@prisma/client';
import { GetSubjectsDto } from '../dtos/get-subjects.dto';

@Injectable()
export class FindSubjects {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findSubjects(query: GetSubjectsDto) {
    const where: Prisma.SubjectWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'search': {
          where.name = { contains: query.search, mode: 'insensitive' };
          break;
        }
        case 'teacherId': {
          where.teachers = { some: { id: query.teacherId } };
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.subject.findMany({
        where,
        include: { teachers: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.subject.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Subject>(
      results,
      count,
      query,
    );
  }
}
