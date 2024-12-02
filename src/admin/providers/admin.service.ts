import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async count() {
    return await this.prisma.admin.count();
  }
}
