import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from "bcrypt"
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, @InjectModel(User.name) private readonly userModel: Model<User>) { }

    // MongoDB
    async registerUserInMongoDB(registerUserDto: RegisterUserDto) {
        const isUserAlreadyExists = await this.userModel.findOne({ email: registerUserDto.email })

        if (isUserAlreadyExists?._id) {
            throw new ConflictException('User already exists with this email in MongoDB');
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10)
        return this.userService.createUserMongo({ ...registerUserDto, password: hashedPassword })
    }

    async findAllInMongo() {
        return this.userService.findAllInMongo()
    }

    async findOneByQueryInMongoDB(id: string) {
        return this.userService.findOneByQueryInMongoDB(id)
    }

    async findOneByParamsInMongoDB(id: string) {
        return this.userService.findOneByParamsInMongoDB(id)
    }

    async loginUserInMongoDB(loginUserDto: LoginUserDto) {
        return this.userService.loginUserInMongoDB(loginUserDto)
    }

    // Postgres
    async registerUserInPostgres(registerUserDto: RegisterUserDto) {
        return this.userService.createUserPostgres(registerUserDto)
    }

    async findAllInPostgres() {
        return this.userService.findAllInPostgres()
    }

    async findOneByQueryInPostgres(id: string) {
        return this.userService.findOneByQueryInPostgres(id)
    }

    async findOneByParamsInPostgres(id: string) {
        return this.userService.findOneByParamsInPostgres(id)
    }

    async loginUserInPostgres(loginUserDto: LoginUserDto) {
        return this.userService.loginUserInPostgres(loginUserDto)
    }
}
