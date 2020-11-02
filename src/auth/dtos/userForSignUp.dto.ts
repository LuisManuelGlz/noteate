import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../decorators';

export class UserForSignUpDto {
  @IsNotEmpty({ message: 'Please write a name' })
  name: string;

  @IsEmail({}, { message: 'Please write a valid email' })
  email: string;

  @IsNotEmpty({ message: "Don't forget your password" })
  @MinLength(8, { message: 'Your password must have at least 8 characters' })
  password1: string;

  @Match('password1', { message: "Passwords don't match" })
  @IsNotEmpty({ message: 'Confirm your password' })
  password2: string;
}
