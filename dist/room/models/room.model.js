"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const clinic_model_1 = require("../../clinic/models/clinic.model");
const payment_model_1 = require("../../payment/models/payment.model");
let Room = class Room extends sequelize_typescript_1.Model {
};
exports.Room = Room;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => clinic_model_1.Clinic),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Room.prototype, "clinic_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => clinic_model_1.Clinic, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", clinic_model_1.Clinic)
], Room.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Room.prototype, "number_seats", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Room.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Room.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payment_model_1.Payment),
    __metadata("design:type", Array)
], Room.prototype, "payment", void 0);
exports.Room = Room = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'room' })
], Room);
//# sourceMappingURL=room.model.js.map