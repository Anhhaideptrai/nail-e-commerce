import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticatedUser } from './auth.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { CustomerJwtAuthGuard, JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Post('customer/register')
  registerCustomer(@Body() body: RegisterCustomerDto) {
    return this.authService.registerCustomer(
      body.email,
      body.password,
      body.name,
    );
  }

  @Post('customer/login')
  loginCustomer(@Body() body: LoginDto) {
    return this.authService.loginCustomer(body.email, body.password);
  }

  @Post('customer/refresh')
  refreshCustomer(@Body() body: RefreshTokenDto) {
    return this.authService.refreshCustomer(body.refreshToken);
  }

  @Get('customer/me')
  @UseGuards(CustomerJwtAuthGuard)
  getCustomerMe(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
