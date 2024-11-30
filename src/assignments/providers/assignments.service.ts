import { Injectable } from '@nestjs/common';
import { FindAssignmentsProvider } from './find-assignments.provider';
import { GetAssignmentsDto } from '../dto/get-assignments.dto';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class AssignmentsService {
  constructor(
    private readonly findAssignmentsProvider: FindAssignmentsProvider,
  ) {}
  async findExams(query: GetAssignmentsDto, currentUser: CurrentUser) {
    return await this.findAssignmentsProvider.findAssignments(
      query,
      currentUser,
    );
  }
}
