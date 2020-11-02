import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserForSignInDto {
  @IsEmail({}, { message: 'Please write a valid email' })
  email: string;

  @IsNotEmpty({ message: "Don't forget your password" })
  password: string;
}
