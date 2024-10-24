import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
// import { Staff } from 'src/staff/models/staff.model';
// import { Doctor } from 'src/doctor/models/doctor.model';
// import { OutsideStaff } from 'src/outside_staff/models/outside_staff.model';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(Staff) private readonly staffModel: typeof Staff,
    // @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    // @InjectModel(OutsideStaff)
    // private readonly outsideStaffModel: typeof OutsideStaff,
    // private readonly jwtService: JwtService,
  ) {}

  // async login(phone_number: string, password: string, res: Response) {
  //   const user = await this.findUserByPhoneNumber(phone_number);
  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const tokens = await this.getTokens(user);
  //   await this.updateRefreshToken(user, tokens.refresh_token);
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return {
  //     user,
  //     tokens,
  //   };
  // }

  // async logout(refreshToken: string, userId: number, res: Response) {
  //   await this.clearRefreshToken(refreshToken, userId);
  //   res.clearCookie('refresh_token');
  // }

  // async refreshToken(userId: number, refreshToken: string, res: Response) {
  //   const user = await this.findUserById(userId);
  //   if (
  //     !user ||
  //     !(await bcrypt.compare(refreshToken, user.hashed_refresh_token))
  //   ) {
  //     throw new ForbiddenException('Access Denied');
  //   }
  //   const tokens = await this.getTokens(user);
  //   await this.updateRefreshToken(user, tokens.refresh_token);
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return tokens;
  // }

  // private async findUserByPhoneNumber(phone_number: string) {
  //   return (
  //     (await this.staffModel.findOne({ where: { phone_number } })) ||
  //     (await this.doctorModel.findOne({ where: { phone_number } })) ||
  //     (await this.outsideStaffModel.findOne({ where: { phone_number } }))
  //   );
  // }

  // private async findUserById(id: number) {
  //   return (
  //     (await this.staffModel.findByPk(id)) ||
  //     (await this.doctorModel.findByPk(id)) ||
  //     (await this.outsideStaffModel.findByPk(id))
  //   );
  // }

  // async getTokens(user: any) {
  //   const [access_token, refresh_token] = await Promise.all([
  //     this.jwtService.signAsync(
  //       { id: user.id, phone_number: user.phone_number },
  //       {
  //         secret: process.env.ACCESS_TOKEN_KEY,
  //         expiresIn: process.env.ACCESS_TOKEN_TIME,
  //       },
  //     ),
  //     this.jwtService.signAsync(
  //       { id: user.id, phone_number: user.phone_number },
  //       {
  //         secret: process.env.REFRESH_TOKEN_KEY,
  //         expiresIn: process.env.REFRESH_TOKEN_TIME,
  //       },
  //     ),
  //   ]);
  //   return { access_token, refresh_token };
  // }

  // async updateRefreshToken(user: any, refreshToken: string) {
  //   const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
  //   if (user instanceof Staff) {
  //     await this.staffModel.update(
  //       { hashed_refresh_token: hashedRefreshToken },
  //       { where: { id: user.id } },
  //     );
  //   } else if (user instanceof Doctor) {
  //     await this.doctorModel.update(
  //       { hashed_refresh_token: hashedRefreshToken },
  //       { where: { id: user.id } },
  //     );
  //   } else if (user instanceof OutsideStaff) {
  //     await this.outsideStaffModel.update(
  //       { hashed_refresh_token: hashedRefreshToken },
  //       { where: { id: user.id } },
  //     );
  //   }
  // }

  // async clearRefreshToken(refreshToken: string, userId: number) {
  //   const user = await this.findUserById(userId);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   const isTokenValid = await bcrypt.compare(
  //     refreshToken,
  //     user.hashed_refresh_token,
  //   );
  //   if (!isTokenValid) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }

  //   if (user instanceof Staff) {
  //     await this.staffModel.update(
  //       { hashed_refresh_token: null },
  //       { where: { id: user.id } },
  //     );
  //   } else if (user instanceof Doctor) {
  //     await this.doctorModel.update(
  //       { hashed_refresh_token: null },
  //       { where: { id: user.id } },
  //     );
  //   } else if (user instanceof OutsideStaff) {
  //     await this.outsideStaffModel.update(
  //       { hashed_refresh_token: null },
  //       { where: { id: user.id } },
  //     );
  //   }
  // }
}
