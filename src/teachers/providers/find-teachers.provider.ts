import { Injectable } from '@nestjs/common';
import { Prisma, Student, Teacher } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetTeachersDto } from '../dto/get-teachers.dto';

@Injectable()
export class FindTeachersProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findTeachers(query: GetTeachersDto) {
    const where: Prisma.TeacherWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'classId': {
          where.lessons = { some: { classId: query.classId } };
          break;
        }
        case 'search': {
          where.name = { contains: query.search, mode: 'insensitive' };
          break;
        }
      }
    }
    const [result, count] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where,
        include: {
          subjects: true,
          classes: true,
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.teacher.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Teacher>(
      result,
      count,
      query,
    );
  }
}
