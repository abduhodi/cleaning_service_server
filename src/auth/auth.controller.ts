import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() login: AuthDto) {
    return this.authService.createAdmin(login);
  }

  @Post('login')
  async login(@Body() login: AuthDto) {
    return this.authService.login(login);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req);
  }
}
