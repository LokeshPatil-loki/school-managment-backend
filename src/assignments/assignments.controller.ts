import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAssignmentsDto } from './dto/get-assignments.dto';
import { query } from 'express';
import { AssignmentsService } from './providers/assignments.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth/clerk-auth.guard';
import { ActiveUserDecorator } from 'src/clerk/decorators/active-user.decorator.decorator';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // @UseGuards(ClerkAuthGuard)
  @Get()
  async findExamService(
    @Query() query: GetAssignmentsDto,
    @ActiveUserDecorator() currentUser: CurrentUser,
  ) {
    const res = await this.assignmentsService.findExams(query, currentUser);
    return res;
  }
}
