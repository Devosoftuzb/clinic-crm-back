"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_model_1 = require("../user/models/user.model");
const employee_model_1 = require("../employees/models/employee.model");
const doctor_model_1 = require("../doctor/models/doctor.model");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User, employee_model_1.Employee, doctor_model_1.Doctor]), jwt_1.JwtModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map