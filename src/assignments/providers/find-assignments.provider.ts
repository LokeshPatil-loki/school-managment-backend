import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetAssignmentsDto } from '../dto/get-assignments.dto';
import { Assignment, Prisma } from '@prisma/client';
@Injectable()
export class FindAssignmentsProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
  ) {}
  async findAssignments(query: GetAssignmentsDto) {
    const where: Prisma.AssignmentWhereInput = {};
    for (let key in query) {
      switch (key) {
        case 'classId': {
          where.lesson = {
            classId: { equals: query.classId },
          };
          break;
        }
        case 'search': {
          where.lesson = {
            subject: {
              name: { contains: query.search, mode: 'insensitive' },
            },
          };
          break;
        }
        case 'teacherId': {
          where.lesson = {
            teacherId: { equals: query.teacherId },
          };
        }
      }
    }
    const [data, count] = await this.prisma.$transaction([
      this.prisma.assignment.findMany({
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
      this.prisma.assignment.count({ where }),
    ]);
    return await this.paginationProvider.paginateOutput<Assignment>(
      data,
      count,
      query,
    );
  }
}
