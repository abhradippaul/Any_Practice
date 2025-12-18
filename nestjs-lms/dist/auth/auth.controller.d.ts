import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
