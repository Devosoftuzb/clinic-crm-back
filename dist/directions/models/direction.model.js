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
exports.Direction = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const clinic_model_1 = require("../../clinic/models/clinic.model");
const direction_types_model_1 = require("../../direction_types/models/direction_types.model");
const visit_direction_model_1 = require("../../visit_directions/models/visit_direction.model");
let Direction = class Direction extends sequelize_typescript_1.Model {
};
exports.Direction = Direction;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Direction.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => clinic_model_1.Clinic),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Direction.prototype, "clinic_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => clinic_model_1.Clinic, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", clinic_model_1.Clinic)
], Direction.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Direction.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => direction_types_model_1.DirectionType, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Direction.prototype, "direction_types", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => visit_direction_model_1.VisitDirection, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Direction.prototype, "visit_directions", void 0);
exports.Direction = Direction = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'direction' })
], Direction);
//# sourceMappingURL=direction.model.js.map