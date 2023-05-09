import { model, Schema } from 'dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { Item } from 'dynamoose/dist/Item';
import { v4 as uuid } from 'uuid';

export const TicketModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  title: 'String',
  genres: {
    type: Array,
    schema: [String],
  },
  releasedYear: 'Number',
  runtime: 'Number',
  rating: 'Number',
  poster: 'String',
};

export class MovieDbModel extends Item {
  id: string;
  userName: string;

  static getModel(tableName: string): ModelType<MovieDbModel> {
    const schema = new Schema(TicketModelSchema, { timestamps: true });
    return model<MovieDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
