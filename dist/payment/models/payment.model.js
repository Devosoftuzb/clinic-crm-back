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
exports.Payment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const clinic_model_1 = require("../../clinic/models/clinic.model");
const payment_method_model_1 = require("../../payment_method/models/payment_method.model");
const room_model_1 = require("../../room/models/room.model");
const visit_direction_model_1 = require("../../visit_directions/models/visit_direction.model");
const visit_model_1 = require("../../visits/models/visit.model");
let Payment = class Payment extends sequelize_typescript_1.Model {
};
exports.Payment = Payment;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => clinic_model_1.Clinic),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Payment.prototype, "clinic_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => clinic_model_1.Clinic, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", clinic_model_1.Clinic)
], Payment.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => visit_model_1.Visit),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "visit_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => visit_model_1.Visit, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", visit_model_1.Visit)
], Payment.prototype, "visit", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => room_model_1.Room),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "room_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => room_model_1.Room, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", room_model_1.Room)
], Payment.prototype, "room", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => visit_direction_model_1.VisitDirection),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "direction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => visit_direction_model_1.VisitDirection, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", visit_direction_model_1.VisitDirection)
], Payment.prototype, "direction", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => payment_method_model_1.PaymentMethod),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "payment_method_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => payment_method_model_1.PaymentMethod, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", payment_method_model_1.PaymentMethod)
], Payment.prototype, "payment_method", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "price", void 0);
exports.Payment = Payment = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'payment' })
], Payment);
//# sourceMappingURL=payment.model.js.map