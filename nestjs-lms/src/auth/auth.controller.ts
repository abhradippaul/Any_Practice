import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // MongoDB
    @Post("mongodb/register")
    registerInMongoDB(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUserInMongoDB(registerUserDto)
    }

    @Get("mongodb/user/")
    findOneByQueryInMongoDB(@Query("id") id: string) {
        return this.authService.findOneByQueryInMongoDB(id)
    }

    @Get("mongodb/users")
    findAllInMongoDB() {
        return this.authService.findAllInMongo()
    }

    @Post("mongodb/login")
    loginUserInMongoDB(@Body() loginUserDto: LoginUserDto) {
        console.log(loginUserDto)
        return this.authService.loginUserInMongoDB(loginUserDto)
    }

    @Get("mongodb/user/:id")
    findOneByParamsInMongoDB(@Param("id") id: string) {
        return this.authService.findOneByParamsInMongoDB(id)
    }

    // Postgres
    @Post("postgres/register")
    registerInPostgres(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUserInPostgres(registerUserDto)
    }

    @Get("postgres/user")
    findOneByQueryInPostgres(@Query("id") id: string) {
        return this.authService.findOneByQueryInPostgres(id)
    }

    @Get("postgres/users")
    findAllInPostgres() {
        return this.authService.findAllInPostgres()
    }

    @Post("postgres/login")
    loginUserInPostgres(@Body() loginUserDto: LoginUserDto) {
        console.log(loginUserDto)
        return this.authService.loginUserInPostgres(loginUserDto)
    }

    @Get("postgres/user/:id")
    findOneByParamsInPostgres(@Param("id") id: string) {
        return this.authService.findOneByParamsInPostgres(id)
    }
}
