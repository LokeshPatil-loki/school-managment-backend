import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetResultsDto } from '../dto/get-results.dto';
import { Result, Prisma } from '@prisma/client';
@Injectable()
export class FindResultsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findResults(query: GetResultsDto) {
    const where: Prisma.ResultWhereInput = {};
    for (let key in query) {
      switch (key) {
        case 'search': {
          where.OR = [
            {
              exam: { title: { contains: query.search, mode: 'insensitive' } },
            },
            {
              student: {
                name: { contains: query.search, mode: 'insensitive' },
              },
            },
          ];
          break;
        }
        case 'studentId': {
          where.studentId = { equals: query.studentId };
        }
      }
    }
    const [data, count] = await this.prisma.$transaction([
      this.prisma.result.findMany({
        where,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
      }),
      this.prisma.result.count({ where }),
    ]);
    return await this.paginationProvider.paginateOutput<Result>(
      data,
      count,
      query,
    );
  }
}
