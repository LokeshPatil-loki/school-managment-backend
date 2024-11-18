import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async paginateOutput<T>(
    data: T[],
    count: number,
    paginateQuery: PaginationQueryDto,
  ) {
    /**
     * Create request urls
     */
    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseUrl);

    /**
     * Calculating Page numbers
     */
    const totalItems = count;
    const totalPages = Math.ceil(totalItems / paginateQuery.limit);
    const nextPage =
      paginateQuery.page === totalPages
        ? paginateQuery.page
        : paginateQuery.page + 1;
    const previousPage =
      paginateQuery.page === 1 ? paginateQuery.page : paginateQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data,
      meta: {
        itemsPerPage: paginateQuery.limit,
        totalItems,
        currentPage: paginateQuery.page,
        totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${paginateQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${previousPage}`,
      },
    };
    return finalResponse;
  }
}
