import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly repoUser: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: string, password: string, res: Response) {
    const user = await this.findUserByPhoneNumber(login);
    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      user,
      tokens,
    };
  }

  async logout(refreshToken: string, userId: string, res: Response) {
    await this.clearRefreshToken(refreshToken, userId);
    res.clearCookie('refresh_token');
  }

  async refreshToken(userId: string, refreshToken: string, res: Response) {
    const user = await this.findUserById(userId);
    if (
      !user ||
      !(await bcrypt.compare(refreshToken, user.hashed_refresh_token))
    ) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  private async findUserByPhoneNumber(login: string) {
    return await this.repoUser.findOne({ where: { login } });
  }

  private async findUserById(id: string) {
    return await this.repoUser.findByPk(id);
  }

  async getTokens(user: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        },
      ),
      this.jwtService.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(user: any, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    if (user instanceof User) {
      await this.repoUser.update(
        { hashed_refresh_token: hashedRefreshToken },
        { where: { id: user.id } },
      );
    }
  }

  async clearRefreshToken(refreshToken: string, userId: string) {
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

    if (user instanceof User) {
      await this.repoUser.update(
        { hashed_refresh_token: null },
        { where: { id: user.id } },
      );
    }
  }
}
