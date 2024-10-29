import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly repoUser: typeof User,
    @InjectModel(Employee) private readonly repoEmployee: typeof Employee,
    @InjectModel(Doctor) private readonly repoDoctor: typeof Doctor,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.findUserByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.role);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return { user, tokens };
  }

  async logout(refreshToken: string, userId: string) {
    await this.clearRefreshToken(refreshToken, userId);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { userId, refreshToken } = refreshTokenDto;
    const user = await this.findUserById(userId);

    if (
      !user ||
      !(await bcrypt.compare(refreshToken, user.hashed_refresh_token))
    ) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.role);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  private async findUserByLogin(login: string) {
    return (
      (await this.repoUser.findOne({ where: { login } })) ||
      (await this.repoEmployee.findOne({ where: { login } })) ||
      (await this.repoDoctor.findOne({ where: { login } }))
    );
  }

  private async findUserById(id: string) {
    return (
      (await this.repoUser.findByPk(id)) ||
      (await this.repoEmployee.findByPk(id)) ||
      (await this.repoDoctor.findByPk(id))
    );
  }

  private async generateTokens(userId: string, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { id: userId, role },
        {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        },
      ),
      this.jwtService.signAsync(
        { id: userId, role },
        {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  private async updateRefreshToken(
    user: User | Employee | Doctor,
    refreshToken: string,
  ) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    const updateData = { hashed_refresh_token: hashedRefreshToken };

    if (user instanceof User) {
      await this.repoUser.update(updateData, { where: { id: user.id } });
    } else if (user instanceof Employee) {
      await this.repoEmployee.update(updateData, { where: { id: user.id } });
    } else if (user instanceof Doctor) {
      await this.repoDoctor.update(updateData, { where: { id: user.id } });
    }
  }

  private async clearRefreshToken(refreshToken: string, userId: string) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const updateData = { hashed_refresh_token: null };

    if (user instanceof User) {
      await this.repoUser.update(updateData, { where: { id: user.id } });
    } else if (user instanceof Employee) {
      await this.repoEmployee.update(updateData, { where: { id: user.id } });
    } else if (user instanceof Doctor) {
      await this.repoDoctor.update(updateData, { where: { id: user.id } });
    }
  }
}
