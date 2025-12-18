import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userService;
    private readonly userModel;
    constructor(userService: UserService, userModel: Model<User>);
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
