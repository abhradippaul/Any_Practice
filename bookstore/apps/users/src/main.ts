import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.USER_SERVICE_PORT ?? 3001
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      port: Number(process.env.USER_SERVICE_PORT ?? 3001)
    }
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log(`Users service running on port ${PORT}`)
}
bootstrap();
