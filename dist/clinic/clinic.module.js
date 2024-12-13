"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicModule = void 0;
const common_1 = require("@nestjs/common");
const clinic_service_1 = require("./clinic.service");
const clinic_controller_1 = require("./clinic.controller");
const sequelize_1 = require("@nestjs/sequelize");
const clinic_model_1 = require("./models/clinic.model");
const jwt_1 = require("@nestjs/jwt");
let ClinicModule = class ClinicModule {
};
exports.ClinicModule = ClinicModule;
exports.ClinicModule = ClinicModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([clinic_model_1.Clinic]), jwt_1.JwtModule],
        controllers: [clinic_controller_1.ClinicController],
        providers: [clinic_service_1.ClinicService],
    })
], ClinicModule);
//# sourceMappingURL=clinic.module.js.map