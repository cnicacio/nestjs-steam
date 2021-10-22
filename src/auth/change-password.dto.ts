import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Type the password' })
  @MinLength(6, { message: 'The password must have at least 6 characters' })
  @MaxLength(32, { message: 'The password must have up to 32 characters' })
  @IsString({ message: 'Please type a valid password' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, a number and one special character',
  })
  password: string;

  @IsNotEmpty({ message: 'Type the password confirmation' })
  @MinLength(6, {
    message: 'The password confirmation must have at least 6 characters',
  })
  @MaxLength(32, { message: 'The password must have up to 32 characters' })
  @IsString({ message: 'Please type a valid password' })
  passwordConfirmation: string;
}
