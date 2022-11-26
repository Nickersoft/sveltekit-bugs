import { Controller, Request, Response, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const result = await this.authService.login(req.user.userId);
    res.cookie('access_token', result.access_token, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
    });
    res.cookie('refresh_token', result.refresh_token, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
    });
    return result;
  }

  @Post('refresh')
  async refresh(@Request() req, @Response({ passthrough: true }) res) {
    const refreshToken = req.cookies['refresh_token'];
    const refreshed = await this.authService.refresh(refreshToken);
    res.cookie('access_token', refreshed.access_token, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
    });
    return refreshed;
  }
}
