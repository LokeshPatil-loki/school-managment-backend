import { Injectable } from '@nestjs/common';
import { GetLessonsDto } from '../dto/get-lessons.dto';
import { Prisma, Lesson } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class FindLessonsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findLessons(query: GetLessonsDto) {
    const where: Prisma.LessonWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'teacherId': {
          where.teacherId = {
            equals: query.teacherId,
          };
          break;
        }
        case 'search': {
          where.OR = [
            {
              subject: {
                name: { contains: query.search, mode: 'insensitive' },
              },
            },
            {
              teacher: {
                name: { contains: query.search, mode: 'insensitive' },
              },
            },
          ];
          break;
        }
        case 'classId': {
          where.classId = {
            equals: query.classId,
          };
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.lesson.findMany({
        where,
        include: { teacher: true, subject: true, class: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.lesson.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Lesson>(
      results,
      count,
      query,
    );
  }
}
