import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SerializeResponse } from '../common/decorators/serialize-response.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @SerializeResponse('simple')
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req: Request) {
    return this.authService.login(loginDto);
  }
}