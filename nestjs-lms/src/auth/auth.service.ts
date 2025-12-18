import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from "bcrypt"
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, @InjectModel(User.name) private readonly userModel: Model<User>) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const isUserAlreadyExists = await this.userModel.findOne({ email: registerUserDto.email })

        if (isUserAlreadyExists?._id) {
            throw new ConflictException('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10)
        return this.userService.createUser({ ...registerUserDto, password: hashedPassword })
    }
}
