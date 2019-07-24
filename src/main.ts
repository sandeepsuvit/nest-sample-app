import * as dotenv from 'dotenv';
import dotenvExpand = require('dotenv-expand');

// Enables use of variables in env files
dotenvExpand(dotenv.config()); // Should always be at the top of base nest app imports

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config/swagger.config';

// Run the applocation on the port specified

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;
  // Enable cors
  app.enableCors();

  // All Application configurations
  app.setGlobalPrefix('api');

  // Enable global pipes
  app.useGlobalPipes(new ValidationPipe({
    // Stripping undefined properties from dto's
    whitelist: true,
    // Transform the dto fields to defined datatypes
    transform: true,
  }));

  // Swagger configuration
  swaggerConfig(app);

  // Setup the port
  await app.listen(port);
  // Log the message to console
  Logger.log(`Server running on port: ${port}`);
}
bootstrap();
