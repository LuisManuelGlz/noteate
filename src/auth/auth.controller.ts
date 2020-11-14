import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserForSignInDto, UserForSignUpDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userForSignInDto: UserForSignInDto) {
    return await this.authService.signIn(userForSignInDto);
  }

  @Post('signup')
  async signUp(@Body() userForSignUpDto: UserForSignUpDto) {
    return await this.authService.signUp(userForSignUpDto);
  }
}
