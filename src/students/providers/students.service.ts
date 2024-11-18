import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { GetStudentsDto } from '../dto/get-students.dto';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { skip } from 'node:test';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll(getStudentsDto: GetStudentsDto) {
    const where: Prisma.StudentWhereInput = {};
    for (const key in getStudentsDto) {
      switch (key) {
        case 'teacherId': {
          where.class = {
            lessons: { some: { teacherId: getStudentsDto.teacherId } },
          };
          break;
        }
        case 'search': {
          where.name = { contains: getStudentsDto.search, mode: 'insensitive' };
          break;
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        include: { results: true, Parent: true, class: true },
        skip: (getStudentsDto.page - 1) * getStudentsDto.limit,
        take: getStudentsDto.limit,
      }),
      this.prisma.student.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Student>(
      results,
      count,
      getStudentsDto,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
