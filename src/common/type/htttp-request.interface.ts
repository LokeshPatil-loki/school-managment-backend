import { User } from '@clerk/express';
import { Request } from 'express';

export interface HttpRequest extends Request {
  user?: User;
}
