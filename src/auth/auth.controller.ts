import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CookieGetter } from 'src/common/decorators/cookieGetter.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'User logout' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Body('userId') userId: string,
  ) {
    await this.authService.logout(refreshToken, userId);
    return { message: 'Successfully logged out.' };
  }

  @ApiOperation({ summary: 'User refresh token generate' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
