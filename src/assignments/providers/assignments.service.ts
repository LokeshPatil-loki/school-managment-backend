import { Injectable } from '@nestjs/common';
import { FindAssignmentsProvider } from './find-assignments.provider';
import { GetAssignmentsDto } from '../dto/get-assignments.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    private readonly findAssignmentsProvider: FindAssignmentsProvider,
  ) {}
  async findExams(query: GetAssignmentsDto) {
    return await this.findAssignmentsProvider.findAssignments(query);
  }
}
