import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetResultsDto } from '../dto/get-results.dto';
import { Result, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/common/type/current-user.interface';
@Injectable()
export class FindResultsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findResults(query: GetResultsDto, currentUser: CurrentUser) {
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

    switch (currentUser.publicMetadata.role) {
      case 'teacher':
        where.OR = [
          { exam: { lesson: { teacherId: currentUser.id } } },
          { assignment: { lesson: { teacherId: currentUser.id } } },
        ];
        break;
      case 'student':
        where.studentId = currentUser.id;
        break;
      case 'parent':
        where.student = {
          parentId: { equals: currentUser.id },
        };
        break;
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
