import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetExamsDto } from '../dto/get-exams.dto';
import { Exam, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class FindExamsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findExams(query: GetExamsDto, currentUser: CurrentUser) {
    const where: Prisma.ExamWhereInput = {};
    where.lesson = {};
    for (let key in query) {
      switch (key) {
        case 'classId': {
          where.lesson.classId = { equals: query.classId };
          break;
        }
        case 'search': {
          where.lesson.subject = {
            name: { contains: query.search, mode: 'insensitive' },
          };
          break;
        }
        case 'teacherId': {
          where.lesson.teacherId = { equals: query.teacherId };
        }
      }
    }

    switch (currentUser.publicMetadata.role) {
      case 'teacher':
        where.lesson.teacherId = currentUser.id;
        break;
      case 'student':
        where.lesson.class = {
          students: { some: { id: currentUser.id } },
        };
      case 'parent':
        where.lesson.class = {
          students: { some: { parentId: currentUser.id } },
        };
        break;
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        where,
        include: {
          lesson: {
            select: {
              subject: { select: { name: true } },
              teacher: { select: { name: true, surname: true } },
              class: { select: { name: true } },
            },
          },
        },
      }),
      this.prisma.exam.count({ where }),
    ]);
    return await this.paginationProvider.paginateOutput<Exam>(
      data,
      count,
      query,
    );
  }
}
