import { Injectable } from '@nestjs/common';
import { MovieDbModel } from 'src/database/models/movie.model';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class MovieService {
  constructor(private readonly databaseService: DatabaseService) {}

  listMovies() {
    return this.databaseService.listMovies();
  }

  createMovie(movie: Partial<MovieDbModel>) {
    return this.databaseService.createMovie(movie);
  }
}
