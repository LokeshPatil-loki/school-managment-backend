import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './providers/assignments.service';
import { FindAssignmentsProvider } from './providers/find-assignments.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService, FindAssignmentsProvider],
  imports: [PaginationModule],
})
export class AssignmentsModule {}
