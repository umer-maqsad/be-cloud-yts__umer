import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { MovieDbModel } from './database/models/movie.model';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  getHello(): { message: string } {
    return { message: 'Hello YTS Server' };
  }

  @Get('movies')
  listMovies() {
    return this.databaseService.listMovies();
  }

  @Post('movies')
  createMovie(@Body() body: MovieDbModel) {
    return this.databaseService.createMovie(body);
  }
}
