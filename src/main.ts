import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfiguration = new DocumentBuilder()
    .setTitle('School Management System')
    .setDescription('REST API for School Management System')
    .setVersion('1.0')
    .addServer('http://localhost:4000', 'Local Environment')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
