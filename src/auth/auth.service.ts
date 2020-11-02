import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { UserForSignInDto, UserForSignUpDto } from './dtos';
import { Token } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);
    if (user && compareSync(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async signIn({ email, password }: UserForSignInDto): Promise<Token> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password are incorrect');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      tokenType: this.configService.get<string>('TOKEN_TYPE'),
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFETIME'),
    };
  }

  async signUp(userForSignUpDto: UserForSignUpDto): Promise<Token> {
    // verify if email already exists
    if (await this.usersService.findOne(userForSignUpDto.email)) {
      throw new BadRequestException('This email already exists');
    }

    const user = await this.usersService.create(userForSignUpDto);
    const payload = { sub: user._id, email: user.email };
    return {
      tokenType: this.configService.get<string>('TOKEN_TYPE'),
      accessToken: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFETIME'),
    };
  }
}
