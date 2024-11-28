import { Injectable } from '@nestjs/common';
import { FindEventsProvider } from './find-events.provider';
import { GetEventsDto } from '../dto/get-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly findEventsProvider: FindEventsProvider) {}
  async findEvents(query: GetEventsDto) {
    return await this.findEventsProvider.findEvents(query);
  }
}
