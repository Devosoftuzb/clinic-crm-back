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
exports.Thead = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const clinic_model_1 = require("../../clinic/models/clinic.model");
const direction_types_model_1 = require("../../direction_types/models/direction_types.model");
const direction_model_1 = require("../../directions/models/direction.model");
const tbody_model_1 = require("../../tbody/models/tbody.model");
let Thead = class Thead extends sequelize_typescript_1.Model {
};
exports.Thead = Thead;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Thead.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => clinic_model_1.Clinic),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Thead.prototype, "clinic_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => clinic_model_1.Clinic, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", clinic_model_1.Clinic)
], Thead.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_model_1.Direction),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Thead.prototype, "direction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_model_1.Direction, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", direction_model_1.Direction)
], Thead.prototype, "direction", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_types_model_1.DirectionType),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Thead.prototype, "service_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_types_model_1.DirectionType, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", direction_types_model_1.DirectionType)
], Thead.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Object)
], Thead.prototype, "thead", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tbody_model_1.Tbody, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Thead.prototype, "tbody", void 0);
exports.Thead = Thead = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'thead' })
], Thead);
//# sourceMappingURL=thead.model.js.map