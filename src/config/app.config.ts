import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('appConfig', () => ({
  clerkClientSecret: process.env.CLERK_SECRET_KEY,
}));

export type AppConfigType = ReturnType<typeof appConfig>;
