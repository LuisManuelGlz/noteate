import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserForSignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
