import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(registerUserDto: RegisterUserDto) {
        const newUser = new this.userModel(registerUserDto)
        const isUserCreated = await newUser.save()

        if (!isUserCreated?._id) throw new InternalServerErrorException('Failed to create user');

        return {
            message: "User created successfully",
            data: isUserCreated
        }
    }
}
