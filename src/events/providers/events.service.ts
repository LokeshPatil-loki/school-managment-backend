import { Injectable } from '@nestjs/common';
import { FindEventsProvider } from './find-events.provider';
import { GetEventsDto } from '../dto/get-events.dto';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class EventsService {
  constructor(private readonly findEventsProvider: FindEventsProvider) {}
  async findEvents(query: GetEventsDto, currentUser: CurrentUser) {
    return await this.findEventsProvider.findEvents(query, currentUser);
  }
}
