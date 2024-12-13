"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorDirectionModule = void 0;
const common_1 = require("@nestjs/common");
const doctor_direction_service_1 = require("./doctor_direction.service");
const doctor_direction_controller_1 = require("./doctor_direction.controller");
const sequelize_1 = require("@nestjs/sequelize");
const doctor_direction_model_1 = require("./models/doctor_direction.model");
const jwt_1 = require("@nestjs/jwt");
let DoctorDirectionModule = class DoctorDirectionModule {
};
exports.DoctorDirectionModule = DoctorDirectionModule;
exports.DoctorDirectionModule = DoctorDirectionModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([doctor_direction_model_1.DoctorDirection]), jwt_1.JwtModule],
        controllers: [doctor_direction_controller_1.DoctorDirectionController],
        providers: [doctor_direction_service_1.DoctorDirectionService],
    })
], DoctorDirectionModule);
//# sourceMappingURL=doctor_direction.module.js.map