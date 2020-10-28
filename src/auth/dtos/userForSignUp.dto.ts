import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserForSignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password1: string;

  @IsNotEmpty()
  password2: string;
}
