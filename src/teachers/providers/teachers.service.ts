import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GetTeachersDto } from '../dto/get-teachers.dto';
import { Prisma, Teacher } from '@prisma/client';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findAll(getTeachersDto: GetTeachersDto) {
    const where: Prisma.TeacherWhereInput = {};
    if (getTeachersDto.classId) {
      where.lessons = {
        some: {
          classId: getTeachersDto.classId,
        },
      };
    }
    const [result, count] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where,
        include: {
          subjects: true,
          classes: true,
        },
        skip: (getTeachersDto.page - 1) * getTeachersDto.limit,
        take: getTeachersDto.limit,
      }),
      this.prisma.teacher.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Teacher>(
      result,
      count,
      getTeachersDto,
    );
  }
  async test(model: Lowercase<Prisma.ModelName>) {}
}
