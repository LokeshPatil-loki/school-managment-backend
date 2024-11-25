import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetClassesDto } from '../dto/get-classes.dto';
import { Class, Prisma } from '@prisma/client';

@Injectable()
export class FindClassesProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findClasses(query: GetClassesDto) {
    const where: Prisma.ClassWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'search': {
          where.name = { contains: query.search, mode: 'insensitive' };
          break;
        }
        case 'supervisorId': {
          where.supervisorId = {
            equals: query.supervisorId,
            mode: 'insensitive',
          };
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.class.findMany({
        where,
        include: { supervisor: true, grade: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.class.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Class>(results, count, query);
  }
}
