import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.BOOK_SERVICE_PORT ?? 3002
  const app = await NestFactory.create(BooksModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Books service running on port ${PORT}`)
}
bootstrap();
