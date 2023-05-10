import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;

  const mockMovies = [
    {
      id: '8a23f1ce-ed0f-4ce1-a019-a574b4434043',
      title: 'The Avengers',
      poster: 'https://images.yts/movies/avenger.png',
      genres: ['Horror'],
      runtime: 97,
      rating: 7.9,
      createdAt: 1683654901836,
      updatedAt: 1683654901836,
    },
  ];

  const mockMovieService = {
    listMovies: jest.fn().mockImplementation(() => mockMovies),
    createMovie: jest.fn().mockImplementation((movie) => {
      return {
        id: '8a23f1ce-ed0f-4ce1-a019-a574b4434041',
        ...movie,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        { provide: MovieService, useValue: mockMovieService },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should yield list of movies', () => {
    const movies = mockMovieService.listMovies();

    expect(controller.listMovies()).toBe(movies);
  });

  it('should create a new movie', () => {
    const movie = {
      title: 'The Avengers',
      poster: 'https://images.yts/movies/avenger.png',
      genres: ['Horror'],
      runtime: 97,
      rating: 7.9,
      createdAt: 1683654901836,
      updatedAt: 1683654901836,
    };

    const createdMovie = mockMovieService.createMovie(movie);

    expect(controller.createMovie(movie)).toEqual(createdMovie);
  });
});
