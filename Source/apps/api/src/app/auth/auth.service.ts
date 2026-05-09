import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { AuthenticatedUser, AuthTokens } from './auth.types';
import { accessTokenTtlSeconds, TokenService } from './token.service';
import {
  addMockCustomerUser,
  mockAuthUsers,
  mockCustomerUsers,
  type MockAuthUser,
} from './mock-users';

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

  registerCustomer(email: string, password: string, name: string) {
    // TODO(database): replace this duplicate check and insert with a customers/users table.
    const normalizedEmail = email.toLowerCase();
    const existingUser = mockCustomerUsers.find(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      throw new ConflictException('Customer email already exists');
    }

    const user = addMockCustomerUser({
      email: normalizedEmail,
      name,
      password,
    });

    return this.createAuthResponse(user);
  }

  loginCustomer(email: string, password: string) {
    // TODO(database): replace this file lookup with a customers/users table query.
    // The password check should move to a hashed-password comparison there.
    const user = mockCustomerUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user || user.password !== password || user.status !== 'active') {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createAuthResponse(user);
  }

  refreshCustomer(refreshToken: string) {
    const payload = this.tokenService.verify(refreshToken, 'refresh');
    // TODO(database): replace this file lookup with a customer lookup by token subject.
    const user = mockCustomerUsers.find((item) => item.id === payload.sub);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid refresh token');
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
    const user = [...mockAuthUsers, ...mockCustomerUsers].find(
      (item) => item.id === userId,
    );

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid access token');
    }

    return this.toAuthenticatedUser(user);
  }

  getAdminByTokenSubject(userId: string): AuthenticatedUser {
    const user = mockAuthUsers.find((item) => item.id === userId);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid admin access token');
    }

    return this.toAuthenticatedUser(user);
  }

  getCustomerByTokenSubject(userId: string): AuthenticatedUser {
    const user = mockCustomerUsers.find((item) => item.id === userId);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Invalid customer access token');
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
