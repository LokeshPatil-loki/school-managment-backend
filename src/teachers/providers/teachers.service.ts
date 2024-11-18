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
    const result = await this.prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      skip: (getTeachersDto.page - 1) * getTeachersDto.limit,
      take: getTeachersDto.limit,
    });
    const count = await this.prisma.teacher.count();
    return this.paginationProvider.paginateOutput<Teacher>(
      result,
      count,
      getTeachersDto,
    );
  }
  async test(model: Lowercase<Prisma.ModelName>) {}
}
