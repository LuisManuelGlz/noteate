import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos';
import { Token } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  @Post()
  signIn(@Body() signInDto: SignInDto): Token {
    return { tokenType: 'Bearer', accessToken: 'abc', expiresIn: 1 };
  }

  signUp(@Body() signUp: SignInDto): Token {
    return { tokenType: 'Bearer', accessToken: 'abc', expiresIn: 1 };
  }
}
