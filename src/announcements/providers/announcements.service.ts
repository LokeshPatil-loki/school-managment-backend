import { Injectable } from '@nestjs/common';
import { FindAnnouncementsProvider } from './find-announcements.provider';
import { GetAnnouncementsDto } from '../dto/get-announcements.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly findAnnouncementsProvider: FindAnnouncementsProvider,
  ) {}

  async findAnnouncements(query: GetAnnouncementsDto) {
    return await this.findAnnouncementsProvider.findAnnouncements(query);
  }
}
