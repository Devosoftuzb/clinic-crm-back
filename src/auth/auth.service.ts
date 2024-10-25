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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly repoUser: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.findUserByPhoneNumber(login);
    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return {
      user,
      tokens,
    };
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

    const tokens = await this.getTokens(user.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  private async findUserByPhoneNumber(login: string) {
    return await this.repoUser.findOne({ where: { login } });
  }

  private async findUserById(id: string) {
    return await this.repoUser.findByPk(id);
  }

  async getTokens(userId: string, role: string) {
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

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.repoUser.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: userId } },
    );
  }

  async clearRefreshToken(refreshToken: string, userId: string) {
    const user = await this.findUserById(userId);
    if (
      !user ||
      !(await bcrypt.compare(refreshToken, user.hashed_refresh_token))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.repoUser.update(
      { hashed_refresh_token: null },
      { where: { id: userId } },
    );
  }
}
