import { User } from '@clerk/express';

export interface CurrentUser extends User {
  publicMetadata: {
    role: string;
  };
}
