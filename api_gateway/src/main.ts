import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './lib/AllExceptionFilter';
import { config } from './common/config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable cors for localhost domain
  app.enableCors({ origin: 'http://localhost' });

  app.useBodyParser('json');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger set up
  const options = new DocumentBuilder()
    .setTitle('Microservice Parking')
    .setDescription('this is v1')
    .setVersion('1.0.0')
    .addTag('This is microservice parking api documentation')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.serverPort, () => {
    console.log(`http://localhost:${config.serverPort}`);
    console.log(`http://localhost:${config.serverPort}/docs`);
  });
}
bootstrap();
