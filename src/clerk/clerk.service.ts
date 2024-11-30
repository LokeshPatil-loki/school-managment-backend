import { Inject, Injectable } from '@nestjs/common';
import { AppConfigType } from 'src/config/app.config';

@Injectable()
export class ClerkService {
  constructor(
    @Inject('APP_CONFIG') private readonly appConfig: AppConfigType,
  ) {}
}
