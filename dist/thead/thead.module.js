"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheadModule = void 0;
const common_1 = require("@nestjs/common");
const thead_service_1 = require("./thead.service");
const thead_controller_1 = require("./thead.controller");
const sequelize_1 = require("@nestjs/sequelize");
const thead_model_1 = require("./models/thead.model");
const jwt_1 = require("@nestjs/jwt");
let TheadModule = class TheadModule {
};
exports.TheadModule = TheadModule;
exports.TheadModule = TheadModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([thead_model_1.Thead]), jwt_1.JwtModule],
        controllers: [thead_controller_1.TheadController],
        providers: [thead_service_1.TheadService],
    })
], TheadModule);
//# sourceMappingURL=thead.module.js.map