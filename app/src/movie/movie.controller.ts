import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieDbModel } from 'src/database/models/movie.model';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/')
  listMovies() {
    return this.movieService.listMovies();
  }

  @Post('/')
  createMovie(@Body() body: Partial<MovieDbModel>) {
    return this.movieService.createMovie(body);
  }
}
