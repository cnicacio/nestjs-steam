import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { ReturnGameDto } from './dto/return-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('games')
@UseGuards(AuthGuard(), RolesGuard)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createGame(
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ): Promise<ReturnGameDto> {
    const game = await this.gamesService.createGame(createGameDto);
    return {
      game,
      message: 'Game succesfully created',
    };
  }

  @Get()
  async findGames() {
    return this.gamesService.findGames();
  }

  @Get('/:id')
  @Role(UserRole.ADMIN)
  async findGameById(@Param('id') id: string): Promise<ReturnGameDto> {
    const game = await this.gamesService.findGameById(id);
    return {
      game,
      message: 'Game has been succesfully found',
    };
  }

  @Patch('/:id')
  async updateGame(
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN)
      throw new ForbiddenException(
        'You do not have authorization to access this route',
      );
    else {
      return this.gamesService.updateGame(updateGameDto, id);
    }
  }

  @Delete('/:id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.gamesService.deleteUser(id);
    return { message: 'Game succesfully removed' };
  }
}
