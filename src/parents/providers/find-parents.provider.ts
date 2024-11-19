import { Injectable } from '@nestjs/common';
import { GetParentsDto } from '../dto/get-parents.dto';
import { Parent, Prisma, Student } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class FindParentsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findParents(query: GetParentsDto) {
    const where: Prisma.ParentWhereInput = {};
    for (const key in query) {
      switch (key) {
        case 'search': {
          where.name = { contains: query.search, mode: 'insensitive' };
          break;
        }
      }
    }
    const [results, count] = await this.prisma.$transaction([
      this.prisma.parent.findMany({
        where,
        include: { Students: true },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.parent.count({ where }),
    ]);
    return this.paginationProvider.paginateOutput<Parent>(
      results,
      count,
      query,
    );
  }
}
