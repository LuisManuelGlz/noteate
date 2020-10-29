import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserForSignInDto, UserForSignUpDto } from './dtos';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() userForSignInDto: UserForSignInDto) {
    return this.authService.signIn(userForSignInDto);
  }

  @Post('signup')
  signUp(@Body() userForSignUpDto: UserForSignUpDto) {
    return this.authService.signUp(userForSignUpDto);
  }
}
