import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserMongoDB, UserSchema as UserMongoDBSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserRepo } from './schemas/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserMongoDB.name, schema: UserMongoDBSchema }]),
    TypeOrmModule.forFeature([UserRepo]),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
