import { NestFactory } from '@nestjs/core';
import { BookstoreApiGatewayModule } from './bookstore-api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.GATEWAY_SERVICE_PORT ?? 3000
  const app = await NestFactory.create(BookstoreApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Gateway service running on port ${PORT}`)
}
bootstrap();
