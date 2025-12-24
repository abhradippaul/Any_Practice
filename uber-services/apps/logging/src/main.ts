import { NestFactory } from '@nestjs/core';
import { LoggingModule } from './logging.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.LOGGING_SERVICE_PORT ?? 3000
  const app = await NestFactory.create(LoggingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Logging Service is running on port ${PORT}`);
}
bootstrap();
