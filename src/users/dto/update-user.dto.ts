import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Type a valid username' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Type a valid e-mail address' })
  email: string;

  @IsOptional()
  role: UserRole;

  @IsOptional()
  status: boolean;
}
