import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './providers/events.service';
import { FindEventsProvider } from './providers/find-events.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, FindEventsProvider],
  imports: [PaginationModule],
})
export class EventsModule {}
