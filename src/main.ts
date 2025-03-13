import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Se quiser prefixar todas as rotas com /api:
  // app.setGlobalPrefix('api');

  // Pipe global para validar DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
  console.log(`Server running on http://localhost:3000`);
}
bootstrap();
