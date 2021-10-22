import { IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  name: string;

  @IsOptional()
  image: string;

  @IsOptional()
  description: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  year: string;
}
