import { Controller, Get, Query } from '@nestjs/common';
import { AnnouncementsService } from './providers/announcements.service';
import { GetAnnouncementsDto } from './dto/get-announcements.dto';
import { ActiveUserDecorator } from 'src/clerk/decorators/active-user.decorator.decorator';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAnnouncements(
    @Query() query: GetAnnouncementsDto,
    @ActiveUserDecorator() currentUser: CurrentUser,
  ) {
    return this.announcementsService.findAnnouncements(query, currentUser);
  }
}
