import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ClerkAuthGuard } from '../clerk-auth/clerk-auth.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.CLERK;

  private readonly AuthTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.CLERK]: this.clerAuthGuard,
    [AuthType.NONE]: {
      canActivate: () => true,
    },
  };

  constructor(
    private readonly clerAuthGuard: ClerkAuthGuard,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes: AuthType[] = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.AuthTypeGuardMap[type]).flat();

    const error = new UnauthorizedException();

    // Loop guard and fire canActivate
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error;
      });
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
