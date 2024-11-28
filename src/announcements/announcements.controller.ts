import { Controller, Get, Query } from '@nestjs/common';
import { AnnouncementsService } from './providers/announcements.service';
import { GetAnnouncementsDto } from './dto/get-announcements.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAnnouncements(@Query() query: GetAnnouncementsDto) {
    return this.announcementsService.findAnnouncements(query);
  }
}
