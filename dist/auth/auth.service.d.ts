import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';
export declare class AuthService {
    private readonly repoUser;
    private readonly repoEmployee;
    private readonly repoDoctor;
    private readonly jwtService;
    constructor(repoUser: typeof User, repoEmployee: typeof Employee, repoDoctor: typeof Doctor, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        user: Doctor | Employee | User;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, userId: string): Promise<void>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private findUserByLogin;
    private findUserById;
    private generateTokens;
    private updateRefreshToken;
    private clearRefreshToken;
}
