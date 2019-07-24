import * as dotenv from 'dotenv';
import dotenvExpand = require('dotenv-expand');

// Enables use of variables in env files
dotenvExpand(dotenv.config()); // Should always be at the top of base nest app imports

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// Run the applocation on the port specified

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;

  app.setGlobalPrefix('api');

  await app.listen(port);

  // Log the message to console
  Logger.log(`Server running on port: ${port}`);
}
bootstrap();