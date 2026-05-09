import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenService } from './token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, TokenService],
})
export class AuthModule {}
