"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitDirectionsModule = void 0;
const common_1 = require("@nestjs/common");
const visit_directions_service_1 = require("./visit_directions.service");
const visit_directions_controller_1 = require("./visit_directions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const visit_direction_model_1 = require("./models/visit_direction.model");
const jwt_1 = require("@nestjs/jwt");
const visit_model_1 = require("../visits/models/visit.model");
let VisitDirectionsModule = class VisitDirectionsModule {
};
exports.VisitDirectionsModule = VisitDirectionsModule;
exports.VisitDirectionsModule = VisitDirectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([visit_direction_model_1.VisitDirection, visit_model_1.Visit]), jwt_1.JwtModule],
        controllers: [visit_directions_controller_1.VisitDirectionsController],
        providers: [visit_directions_service_1.VisitDirectionsService],
    })
], VisitDirectionsModule);
//# sourceMappingURL=visit_directions.module.js.map