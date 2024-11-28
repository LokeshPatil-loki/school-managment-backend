import { Module } from '@nestjs/common';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './providers/announcements.service';
import { FindAnnouncementsProvider } from './providers/find-announcements.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, FindAnnouncementsProvider],
  imports: [PaginationModule],
})
export class AnnouncementsModule {}
