import { Injectable } from '@nestjs/common';
import { FindAnnouncementsProvider } from './find-announcements.provider';
import { GetAnnouncementsDto } from '../dto/get-announcements.dto';
import { CurrentUser } from 'src/common/type/current-user.interface';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly findAnnouncementsProvider: FindAnnouncementsProvider,
  ) {}

  async findAnnouncements(
    query: GetAnnouncementsDto,
    currentUser: CurrentUser,
  ) {
    return await this.findAnnouncementsProvider.findAnnouncements(
      query,
      currentUser,
    );
  }
}
