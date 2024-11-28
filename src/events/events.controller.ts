import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './providers/events.service';
import { GetEventsDto } from './dto/get-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  findEvents(@Query() query: GetEventsDto) {
    return this.eventsService.findEvents(query);
  }
}
