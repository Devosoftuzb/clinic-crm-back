"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_controller_1 = require("./room.controller");
const sequelize_1 = require("@nestjs/sequelize");
const room_model_1 = require("./models/room.model");
const jwt_1 = require("@nestjs/jwt");
let RoomModule = class RoomModule {
};
exports.RoomModule = RoomModule;
exports.RoomModule = RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([room_model_1.Room]), jwt_1.JwtModule],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService],
    })
], RoomModule);
//# sourceMappingURL=room.module.js.map