import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from './games.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
