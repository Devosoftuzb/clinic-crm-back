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
exports.DoctorDirection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const direction_types_model_1 = require("../../direction_types/models/direction_types.model");
const doctor_model_1 = require("../../doctor/models/doctor.model");
let DoctorDirection = class DoctorDirection extends sequelize_typescript_1.Model {
};
exports.DoctorDirection = DoctorDirection;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], DoctorDirection.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_types_model_1.DirectionType),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], DoctorDirection.prototype, "direction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_types_model_1.DirectionType, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", direction_types_model_1.DirectionType)
], DoctorDirection.prototype, "direction", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => doctor_model_1.Doctor),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], DoctorDirection.prototype, "doctor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => doctor_model_1.Doctor, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", doctor_model_1.Doctor)
], DoctorDirection.prototype, "doctor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], DoctorDirection.prototype, "price", void 0);
exports.DoctorDirection = DoctorDirection = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'doctor_direction' })
], DoctorDirection);
//# sourceMappingURL=doctor_direction.model.js.map