import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetEventsDto } from '../dto/get-events.dto';
import { Event, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class FindEventsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findEvents(query: GetEventsDto, currentUser: CurrentUser) {
    const where: Prisma.EventWhereInput = {};
    for (let key in query) {
      switch (key) {
        case 'classId': {
          where.classId = { equals: query.classId };
          break;
        }
        case 'search': {
          where.title = { contains: query.search, mode: 'insensitive' };
          break;
        }
      }
    }
    const roleConditions = {
      teacher: { lessons: { some: { teacherId: currentUser.id } } },
      student: { students: { some: { id: currentUser.id } } },
      parent: { students: { some: { parentId: currentUser.id } } },
    };

    where.OR = [
      { classId: null },
      {
        class: roleConditions[currentUser.publicMetadata.role] || {},
      },
    ];

    const [data, count] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where,
        include: {
          class: {
            select: { name: true },
          },
        },
      }),
      this.prisma.event.count({ where }),
    ]);
    return await this.paginationProvider.paginateOutput<Event>(
      data,
      count,
      query,
    );
  }
}
