import { INestApplication } from '@nestjs/common';
import { SwaggerCustomOptions, SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger configuration setup
 *
 * @export
 * @param {INestApplication} app
 */
export function swaggerConfig(app: INestApplication) {
    // Swagger configuration
    const options = new DocumentBuilder()
        .setTitle('Api Documentation')
        .setDescription('Some description')
        .setVersion('v0.1')
        .setBasePath('/api')
        .setSchemes('http', 'https')
        .addTag('health', 'Health check')
        .addTag('auth')
        .addTag('user')
        // Enabling authentication in swagger
        .addBearerAuth()
    // Add all your config here
    .build();

    // // Custom swagger options
    const customOptions: SwaggerCustomOptions = {
        customSiteTitle: `API Documentation`,
    };

    const document = SwaggerModule.createDocument(app, options);

    // // Setup swagger endpoint
    SwaggerModule.setup(process.env.SWAGGER_ENDPOINT, app, document, customOptions);
}
