import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { stringify } from 'json-bigint';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './extensions/filters/http-exception.filter'; 

JSON.stringify = stringify;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  const config = new DocumentBuilder()
    .setTitle('Nestjs API')
    .setDescription('Nestjs Api with prisma')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addTag('nest')
    .build();

  await app.listen(3000);
}
bootstrap();
