"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbodyModule = void 0;
const common_1 = require("@nestjs/common");
const tbody_service_1 = require("./tbody.service");
const tbody_controller_1 = require("./tbody.controller");
const sequelize_1 = require("@nestjs/sequelize");
const tbody_model_1 = require("./models/tbody.model");
const jwt_1 = require("@nestjs/jwt");
let TbodyModule = class TbodyModule {
};
exports.TbodyModule = TbodyModule;
exports.TbodyModule = TbodyModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([tbody_model_1.Tbody]), jwt_1.JwtModule],
        controllers: [tbody_controller_1.TbodyController],
        providers: [tbody_service_1.TbodyService],
    })
], TbodyModule);
//# sourceMappingURL=tbody.module.js.map