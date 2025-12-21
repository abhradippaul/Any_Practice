import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User as UserModel } from 'src/user/schemas/user.schema';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserRepo } from './schemas/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
        @InjectRepository(UserRepo) private userRepository: Repository<UserRepo>,
        private readonly jwtService: JwtService,
    ) { }

    // MongoDB
    async createUserMongo(registerUserDto: RegisterUserDto) {
        const newUser = new this.userModel(registerUserDto)

        try {
            const isUserCreated = await newUser.save()

            if (!isUserCreated?._id) throw new InternalServerErrorException('Failed to create user in MongoDB');

            return {
                message: "User created successfully in MongoDB",
                data: isUserCreated
            }
        } catch (err) {
            console.log(err)
            return {
                message: 'Failed to create user in MongoDB',
            }
        }
    }

    async findAllInMongo() {
        const users = await this.userModel.find()

        return {
            message: "User fetched successfully from MongoDB",
            data: users
        }
    }

    async findOneByQueryInMongoDB(id: string) {
        if (!id) {
            throw new BadRequestException("Id is required")
        }
        const users = await this.userModel.findById(id)

        return {
            message: "User fetched by query successfully from MongoDB",
            data: users
        }
    }

    async findOneByParamsInMongoDB(id: string) {
        if (!id) {
            throw new BadRequestException("Id is required")
        }
        const users = await this.userModel.findById(id)

        return {
            message: "User fetched by params successfully from MongoDB",
            data: users
        }
    }

    async loginUserInMongoDB(loginUserDto: LoginUserDto) {
        const isUserExists = await this.userModel.findOne({ email: loginUserDto.email })

        if (!isUserExists?._id) {
            throw new UnauthorizedException("Email or password is wrong")
        }
        const isValidPassword = await bcrypt.compare(loginUserDto.password, isUserExists.password)
        if (!isValidPassword) {
            throw new UnauthorizedException("Email or password is wrong")
        }

        const payload = { sub: isUserExists._id }
        const access_token = await this.jwtService.signAsync(payload)

        return {
            message: "User loggedin successfully in MongoDB",
            access_token
        }
    }

    // Postgres
    async createUserPostgres(registerUserDto: RegisterUserDto) {
        const isUserAlreadyExists = await this.userRepository.findOne({ where: { email: registerUserDto.email } })

        if (isUserAlreadyExists?.id) {
            throw new ConflictException('User already exists with this email in Postgres');
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10)

        try {
            const user = this.userRepository.create({ ...registerUserDto, password: hashedPassword })
            const isUserCreated = await this.userRepository.save(user)
            if (!isUserCreated?.id) throw new InternalServerErrorException('Failed to create user in Postgres');

            return {
                message: "User created successfully in Postgres",
                data: isUserCreated
            }
        } catch (err) {
            console.log(err)
            return {
                message: 'Failed to create user in Postgres',
            }
        }
    }

    async findAllInPostgres() {
        const users = await this.userRepository.find()

        return {
            message: "User fetched successfully from Postgres",
            data: users
        }
    }

    async findOneByQueryInPostgres(id: string) {
        if (!id) {
            throw new BadRequestException("Id is required")
        }
        const users = await this.userModel.findById(id)

        return {
            message: "User fetched by query successfully from Postgres",
            data: users
        }
    }

    async findOneByParamsInPostgres(id: string) {
        if (!id) {
            throw new BadRequestException("Id is required")
        }
        const users = await this.userModel.findById(id)

        return {
            message: "User fetched by params successfully from Postgres",
            data: users
        }
    }

    async loginUserInPostgres(loginUserDto: LoginUserDto) {
        const isUserExists = await this.userRepository.findOne({ where: { email: loginUserDto.email } })

        if (!isUserExists?.id) {
            throw new UnauthorizedException("Email or password is wrong")
        }
        const isValidPassword = await bcrypt.compare(loginUserDto.password, isUserExists.password)
        if (!isValidPassword) {
            throw new UnauthorizedException("Email or password is wrong")
        }

        const payload = { sub: isUserExists.id }
        const access_token = await this.jwtService.signAsync(payload)

        return {
            message: "User loggedin successfully in Postgres",
            access_token
        }
    }
}
