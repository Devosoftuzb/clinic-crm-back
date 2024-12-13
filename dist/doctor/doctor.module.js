"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModule = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const doctor_controller_1 = require("./doctor.controller");
const sequelize_1 = require("@nestjs/sequelize");
const doctor_model_1 = require("./models/doctor.model");
const jwt_1 = require("@nestjs/jwt");
const employee_model_1 = require("../employees/models/employee.model");
const user_model_1 = require("../user/models/user.model");
let DoctorModule = class DoctorModule {
};
exports.DoctorModule = DoctorModule;
exports.DoctorModule = DoctorModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([doctor_model_1.Doctor, employee_model_1.Employee, user_model_1.User]), jwt_1.JwtModule],
        controllers: [doctor_controller_1.DoctorController],
        providers: [doctor_service_1.DoctorService],
    })
], DoctorModule);
//# sourceMappingURL=doctor.module.js.map