import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../auth.types';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

type RequestWithHeaders = AuthenticatedRequest & {
  headers?: Record<string, string | string[] | undefined>;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithHeaders>();
    const token = this.extractBearerToken(request.headers?.authorization);
    const payload = this.tokenService.verify(token, 'access');

    request.user = this.authService.getUserByTokenSubject(payload.sub);

    return true;
  }

  private extractBearerToken(authorizationHeader: string | string[] | undefined) {
    const header = Array.isArray(authorizationHeader)
      ? authorizationHeader[0]
      : authorizationHeader;
    const [scheme, token] = header?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    return token;
  }
}
