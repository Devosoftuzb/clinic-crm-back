"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionTypesModule = void 0;
const common_1 = require("@nestjs/common");
const direction_types_service_1 = require("./direction_types.service");
const direction_types_controller_1 = require("./direction_types.controller");
const sequelize_1 = require("@nestjs/sequelize");
const direction_types_model_1 = require("./models/direction_types.model");
const jwt_1 = require("@nestjs/jwt");
let DirectionTypesModule = class DirectionTypesModule {
};
exports.DirectionTypesModule = DirectionTypesModule;
exports.DirectionTypesModule = DirectionTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([direction_types_model_1.DirectionType]), jwt_1.JwtModule],
        controllers: [direction_types_controller_1.DirectionTypesController],
        providers: [direction_types_service_1.DirectionTypesService],
    })
], DirectionTypesModule);
//# sourceMappingURL=direction_types.module.js.map