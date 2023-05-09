import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { aws } from 'dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { ConfigKeys } from './../config/app.configuration';
import { MovieDbModel } from './models/movie.model';

@Injectable()
export class DatabaseService {
  private readonly movieDbModel: ModelType<MovieDbModel>;

  constructor(private readonly configService: ConfigService) {
    this.configureDynamoDB();
    this.movieDbModel = MovieDbModel.getModel(
      this.configService.get<string>(ConfigKeys.MOVIE_TABLE_NAME) ?? '',
    );
  }

  listMovies(): Promise<MovieDbModel[]> {
    return this.movieDbModel.scan().exec();
  }

  createMovie(movie: Partial<MovieDbModel>): Promise<MovieDbModel> {
    return this.movieDbModel.create(movie);
  }

  private configureDynamoDB() {
    const ddb = new aws.ddb.DynamoDB({
      credentials: {
        accessKeyId:
          this.configService.get<string>(ConfigKeys.ACCESS_KEY_ID) ?? '',
        secretAccessKey:
          this.configService.get<string>(ConfigKeys.SECRET_ACCESS_KEY) ?? '',
      },
      region: 'ap-southeast-1',
    });
    aws.ddb.set(ddb);
  }
}
