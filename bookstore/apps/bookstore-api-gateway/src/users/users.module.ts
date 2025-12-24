import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development"
    }),
    ClientsModule.register([{
      name: "USERS_CLIENT",
      transport: Transport.TCP,
      options: { port: Number(process.env.USER_SERVICE_PORT ?? 3001) }
    }])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
