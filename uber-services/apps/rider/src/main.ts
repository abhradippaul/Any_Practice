import { NestFactory } from '@nestjs/core';
import { RiderModule } from './rider.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.RIDER_SERVICE_PORT ?? 3001
  const app = await NestFactory.create(RiderModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Rider Service is running on port ${PORT}`);
}
bootstrap();
