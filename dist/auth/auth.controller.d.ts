import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: import("../doctor/models/doctor.model").Doctor | import("../employees/models/employee.model").Employee | import("../user/models/user.model").User;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, userId: string): Promise<{
        message: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
