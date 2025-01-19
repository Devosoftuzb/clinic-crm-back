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
exports.VisitDirection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const direction_types_model_1 = require("../../direction_types/models/direction_types.model");
const direction_model_1 = require("../../directions/models/direction.model");
const doctor_model_1 = require("../../doctor/models/doctor.model");
const payment_model_1 = require("../../payment/models/payment.model");
const visit_model_1 = require("../../visits/models/visit.model");
let VisitDirection = class VisitDirection extends sequelize_typescript_1.Model {
};
exports.VisitDirection = VisitDirection;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => visit_model_1.Visit),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "visit_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => visit_model_1.Visit),
    __metadata("design:type", visit_model_1.Visit)
], VisitDirection.prototype, "visit", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_model_1.Direction),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "direction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_model_1.Direction),
    __metadata("design:type", direction_model_1.Direction)
], VisitDirection.prototype, "direction", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_types_model_1.DirectionType),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "service_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_types_model_1.DirectionType),
    __metadata("design:type", direction_types_model_1.DirectionType)
], VisitDirection.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => doctor_model_1.Doctor),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], VisitDirection.prototype, "doctor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => doctor_model_1.Doctor),
    __metadata("design:type", doctor_model_1.Doctor)
], VisitDirection.prototype, "doctor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], VisitDirection.prototype, "line", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], VisitDirection.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], VisitDirection.prototype, "is_payment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], VisitDirection.prototype, "is_checked", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], VisitDirection.prototype, "diagnosis", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], VisitDirection.prototype, "retsept", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => doctor_model_1.Doctor),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
    }),
    __metadata("design:type", String)
], VisitDirection.prototype, "id_doctor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => doctor_model_1.Doctor),
    __metadata("design:type", doctor_model_1.Doctor)
], VisitDirection.prototype, "id_doctor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => payment_model_1.Payment),
    __metadata("design:type", Array)
], VisitDirection.prototype, "payment", void 0);
exports.VisitDirection = VisitDirection = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'visit_direction' })
], VisitDirection);
//# sourceMappingURL=visit_direction.model.js.map