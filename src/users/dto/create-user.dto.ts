import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Type an e-mail address' })
  @IsEmail({}, { message: 'Type a valid e-mail address' })
  @MaxLength(200, {
    message: 'The e-mail address must be shorter than 200 characters',
  })
  email: string;

  @IsNotEmpty({ message: 'Type the name' })
  @MaxLength(200, {
    message: 'The name must be shorter than 200 characters',
  })
  name: string;

  @IsNotEmpty({ message: 'Type the password' })
  @MinLength(6, { message: 'The password must have at least 6 characters' })
  password: string;

  @IsNotEmpty({ message: 'Type the password confirmation' })
  @MinLength(6, {
    message: 'The password confirmation must have at least 6 characters',
  })
  passwordConfirmation: string;
}
