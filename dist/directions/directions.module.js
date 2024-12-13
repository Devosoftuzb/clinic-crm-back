"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionsModule = void 0;
const common_1 = require("@nestjs/common");
const directions_service_1 = require("./directions.service");
const directions_controller_1 = require("./directions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const direction_model_1 = require("./models/direction.model");
const jwt_1 = require("@nestjs/jwt");
let DirectionsModule = class DirectionsModule {
};
exports.DirectionsModule = DirectionsModule;
exports.DirectionsModule = DirectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([direction_model_1.Direction]), jwt_1.JwtModule],
        controllers: [directions_controller_1.DirectionsController],
        providers: [directions_service_1.DirectionsService],
    })
], DirectionsModule);
//# sourceMappingURL=directions.module.js.map