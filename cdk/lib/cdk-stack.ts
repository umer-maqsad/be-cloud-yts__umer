import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class StaticStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const movieTable = new dynamodb.Table(this, 'Movie', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableClass: dynamodb.TableClass.STANDARD,
    });

  }
}
