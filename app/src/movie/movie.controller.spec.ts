import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbModel } from 'src/database/models/movie.model';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let service: MovieService;
  let controller: MovieController;

  const mockMovieService = {
    listMovies: jest.fn(),
    createMovie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .compile();

    service = module.get<MovieService>(MovieService);
    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should yield list of movies', () => {
    const movies = [
      {
        id: '8a23f1ce-ed0f-4ce1-a019-a574b4434048',
        title: 'The Avengers',
        poster:
          'https://images.yts/movies/posters/8a23f1ce-ed0f-4ce1-a019-a574b4434048/avengers-medium(1024*2048).jpeg',
        genres: ['Crime', 'Action', 'Sci-Fi'],
        rating: 7.8,
        runtime: 118,
        releasedYear: 2012,
      },
    ] as MovieDbModel[];

    const listMoviesSpy = jest
      .spyOn(service, 'listMovies')
      .mockResolvedValue(movies);

    expect(controller.listMovies()).resolves.toEqual(movies);
    expect(listMoviesSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new movie', () => {
    const movieRequest = {
      title: 'The Avengers',
      poster:
        'https://images.yts/movies/posters/8a23f1ce-ed0f-4ce1-a019-a574b4434048/avengers-medium(1024*2048).jpeg',
      genres: ['Crime', 'Action', 'Sci-Fi'],
      rating: 7.8,
      runtime: 118,
      releasedYear: 2012,
    };

    const createdMovie = {
      id: '8a23f1ce-ed0f-4ce1-a019-a574b4434047',
      ...movieRequest,
    } as MovieDbModel;
    const createMovieSpy = jest
      .spyOn(service, 'createMovie')
      .mockResolvedValue(createdMovie);

    expect(controller.createMovie(movieRequest)).resolves.toEqual(createdMovie);
    expect(createMovieSpy).toHaveBeenCalledTimes(1);
  });
});
