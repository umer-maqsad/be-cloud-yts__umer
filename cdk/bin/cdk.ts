#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { StaticStack } from '../lib/cdk-stack';

const app = new cdk.App();
new StaticStack(app, 'YtsStaticStack', {});