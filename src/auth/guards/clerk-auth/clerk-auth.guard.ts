import { User, verifyToken } from '@clerk/express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClerkService } from 'src/clerk/clerk.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(private readonly clerkService: ClerkService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.__session;
    if (!token) {
      throw new UnauthorizedException('Session cookie is missing');
    }
    try {
      const payload = await verifyToken(token, {
        secretKey: `sk_test_iYBKxkPWuZELDNLhEQlw2Y3iYulNBRcECe9MriFGLw`,
      });

      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid Session');
      }
      request.user = await this.clerkService.client.users.getUser(payload.sub);
      return true;
    } catch (error) {
      this.logger.error(error);
      console.log(error);
      throw new UnauthorizedException('Invalid or expired session.');
    }
  }
}
