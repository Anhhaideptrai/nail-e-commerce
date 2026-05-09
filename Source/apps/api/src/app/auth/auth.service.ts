import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { AuthenticatedUser, AuthTokens } from './auth.types';
import { accessTokenTtlSeconds, TokenService } from './token.service';
import { mockAuthUsers, type MockAuthUser } from './mock-users';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  login(email: string, password: string) {
    // TODO(database): replace this file lookup with a users/admin_accounts table query.
    // The password check should also move to a hashed-password comparison there.
    const user = mockAuthUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user || user.password !== password || user.status !== 'active') {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createAuthResponse(user);
  }

  refresh(refreshToken: string) {
    const payload = this.tokenService.verify(refreshToken, 'refresh');
    // TODO(database): replace this file lookup with a user lookup by token subject.
    // If refresh tokens are persisted later, validate the token id/session here too.
    const user = mockAuthUsers.find((item) => item.id === payload.sub);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.createAuthResponse(user);
  }

  getUserByTokenSubject(userId: string): AuthenticatedUser {
    // TODO(database): replace this file lookup with a user lookup by access-token subject.
    const user = mockAuthUsers.find((item) => item.id === userId);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid access token');
    }

    return this.toAuthenticatedUser(user);
  }

  private createAuthResponse(user: MockAuthUser) {
    return {
      tokens: {
        accessToken: this.tokenService.createAccessToken(user),
        expiresIn: accessTokenTtlSeconds,
        refreshToken: this.tokenService.createRefreshToken(user),
        tokenType: 'Bearer',
      } satisfies AuthTokens,
      user: this.toAuthenticatedUser(user),
    };
  }

  private toAuthenticatedUser(user: MockAuthUser): AuthenticatedUser {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
