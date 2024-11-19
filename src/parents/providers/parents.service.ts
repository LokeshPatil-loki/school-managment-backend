import { Injectable } from '@nestjs/common';
import { CreateParentDto } from '../dto/create-parent.dto';
import { UpdateParentDto } from '../dto/update-parent.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FindParentsProvider } from './find-parents.provider';
import { GetParentsDto } from '../dto/get-parents.dto';

@Injectable()
export class ParentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
    private readonly findParentsProvider: FindParentsProvider,
  ) {}

  async findParents(query: GetParentsDto) {
    return await this.findParentsProvider.findParents(query);
  }
}
