import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetAnnouncementsDto } from '../dto/get-announcements.dto';
import { Announcement, Prisma } from '@prisma/client';

@Injectable()
export class FindAnnouncementsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findAnnouncements(query: GetAnnouncementsDto) {
    const where: Prisma.AnnouncementWhereInput = {};
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
    const [data, count] = await this.prisma.$transaction([
      this.prisma.announcement.findMany({
        where,
        include: {
          class: {
            select: { name: true },
          },
        },
      }),
      this.prisma.announcement.count({ where }),
    ]);
    return await this.paginationProvider.paginateOutput<Announcement>(
      data,
      count,
      query,
    );
  }
}
