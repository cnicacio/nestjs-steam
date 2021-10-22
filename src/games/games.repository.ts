import { EntityRepository, Repository } from 'typeorm';
import { Game } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UserRole } from '../users/user-roles.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(
    createGameDto: CreateGameDto,
    role: UserRole,
  ): Promise<Game> {
    const { name, image, description, genre, year } = createGameDto;

    const game = this.create();

    game.name = name;
    game.image = image;
    game.description = description;
    game.genre = genre;
    game.date = year;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        // 23505 é unique_violation, ou seja, já detecta se há um e-mail que já está em uso!!
        throw new ConflictException('This gamr is already registered');
      } else {
        throw new InternalServerErrorException(
          'The gane could not have been saved in the database',
        );
      }
    }
  }
}
