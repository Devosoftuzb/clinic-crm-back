"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_model_1 = require("../user/models/user.model");
const employee_model_1 = require("../employees/models/employee.model");
const doctor_model_1 = require("../doctor/models/doctor.model");
let AuthService = class AuthService {
    constructor(repoUser, repoEmployee, repoDoctor, jwtService) {
        this.repoUser = repoUser;
        this.repoEmployee = repoEmployee;
        this.repoDoctor = repoDoctor;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { login, password } = loginDto;
        const user = await this.findUserByLogin(login);
        if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await this.updateRefreshToken(user, tokens.refresh_token);
        return { user, tokens };
    }
    async logout(refreshToken, userId) {
        await this.clearRefreshToken(refreshToken, userId);
    }
    async refreshToken(refreshTokenDto) {
        const { userId, refreshToken } = refreshTokenDto;
        const user = await this.findUserById(userId);
        if (!user ||
            !(await bcrypt.compare(refreshToken, user.hashed_refresh_token))) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await this.updateRefreshToken(user, tokens.refresh_token);
        return tokens;
    }
    async findUserByLogin(login) {
        return ((await this.repoUser.findOne({
            where: { login },
            include: { all: true },
        })) ||
            (await this.repoEmployee.findOne({
                where: { login },
                include: { all: true },
            })) ||
            (await this.repoDoctor.findOne({
                where: { login },
                include: { all: true },
            })));
    }
    async findUserById(id) {
        return ((await this.repoUser.findByPk(id)) ||
            (await this.repoEmployee.findByPk(id)) ||
            (await this.repoDoctor.findByPk(id)));
    }
    async generateTokens(userId, role) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({ id: userId, role }, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync({ id: userId, role }, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return { access_token, refresh_token };
    }
    async updateRefreshToken(user, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
        const updateData = { hashed_refresh_token: hashedRefreshToken };
        if (user instanceof user_model_1.User) {
            await this.repoUser.update(updateData, { where: { id: user.id } });
        }
        else if (user instanceof employee_model_1.Employee) {
            await this.repoEmployee.update(updateData, { where: { id: user.id } });
        }
        else if (user instanceof doctor_model_1.Doctor) {
            await this.repoDoctor.update(updateData, { where: { id: user.id } });
        }
    }
    async clearRefreshToken(refreshToken, userId) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isTokenValid = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
        if (!isTokenValid) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const updateData = { hashed_refresh_token: null };
        if (user instanceof user_model_1.User) {
            await this.repoUser.update(updateData, { where: { id: user.id } });
        }
        else if (user instanceof employee_model_1.Employee) {
            await this.repoEmployee.update(updateData, { where: { id: user.id } });
        }
        else if (user instanceof doctor_model_1.Doctor) {
            await this.repoDoctor.update(updateData, { where: { id: user.id } });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(doctor_model_1.Doctor)),
    __metadata("design:paramtypes", [Object, Object, Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map