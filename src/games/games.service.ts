import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './games.entity';
import { GameRepository } from './games.repository';
import { UserRole } from 'src/users/user-roles.enum';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createGame(createGameDto, UserRole.ADMIN);
  }

  async findGames(): Promise<Game[]> {
    return Game.find({
      relations: ['games'],
    });
  }

  async findGameById(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id, {
      select: ['name', 'image', 'description', 'genre', 'date', 'id'],
    });

    if (!game) throw new NotFoundException('Game not found');

    return game;
  }

  async updateGame(updateGameDto: UpdateGameDto, id: string): Promise<Game> {
    const game = await this.findGameById(id);
    const { name, image, description, genre } = updateGameDto;
    game.name = name ? name : game.name;
    game.image = image ? image : game.image;
    game.description = description ? description : game.description;
    game.genre = genre ? genre : game.genre;

    try {
      await game.save();
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'There was an error while updating the game into the database',
      );
    }
  }

  async deleteUser(id: string) {
    const result = await this.gameRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException('Game not found');
    }
  }
}
