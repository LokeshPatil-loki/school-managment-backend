import { ClerkClient, clerkClient, createClerkClient } from '@clerk/express';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AppConfigType } from 'src/config/app.config';

@Injectable()
export class ClerkService implements OnModuleInit {
  client: ClerkClient;
  constructor(
    @Inject('APP_CONFIG') private readonly appConfig: AppConfigType,
  ) {}
  async onModuleInit() {
    this.client = createClerkClient({
      secretKey: this.appConfig.clerkClientSecret,
    });
  }
}
