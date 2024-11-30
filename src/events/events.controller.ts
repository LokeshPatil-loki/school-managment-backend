import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './providers/events.service';
import { GetEventsDto } from './dto/get-events.dto';
import { ActiveUserDecorator } from 'src/clerk/decorators/active-user.decorator.decorator';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  findEvents(
    @Query() query: GetEventsDto,
    @ActiveUserDecorator() currentUser: CurrentUser,
  ) {
    return this.eventsService.findEvents(query, currentUser);
  }
}
