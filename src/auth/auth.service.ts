import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces';
import { UsersService } from '../users/users.service';
import { UserForSignInDto, UserForSignUpDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async signIn({ email, password }: UserForSignInDto) {
    const user = await this.validateUser(email, password);
    console.log(this.configService.get<string>('DATABASE_URL'));
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, email: user.email };

    return {
      tokenType: this.configService.get<string>('TOKEN_TYPE'),
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFETIME'),
    };
  }

  async signUp({ email, password1 }: UserForSignUpDto) {
    const user = await this.validateUser(email, password1);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, email: user.email };

    return {
      tokenType: this.configService.get<string>('TOKEN_TYPE'),
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFETIME'),
    };
  }
}
