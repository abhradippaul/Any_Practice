import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.UBER_SERVICE_PORT ?? 3000
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Uber Service is running on port ${PORT}`);
}
bootstrap();
