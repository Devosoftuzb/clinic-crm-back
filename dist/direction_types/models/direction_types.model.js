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
exports.DirectionType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const direction_model_1 = require("../../directions/models/direction.model");
const doctor_direction_model_1 = require("../../doctor_direction/models/doctor_direction.model");
const visit_direction_model_1 = require("../../visit_directions/models/visit_direction.model");
let DirectionType = class DirectionType extends sequelize_typescript_1.Model {
};
exports.DirectionType = DirectionType;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], DirectionType.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => direction_model_1.Direction),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], DirectionType.prototype, "direction_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => direction_model_1.Direction, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", direction_model_1.Direction)
], DirectionType.prototype, "direction", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], DirectionType.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], DirectionType.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => doctor_direction_model_1.DoctorDirection, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], DirectionType.prototype, "doctorDirection", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => visit_direction_model_1.VisitDirection, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], DirectionType.prototype, "visit_directions", void 0);
exports.DirectionType = DirectionType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'direction_type' })
], DirectionType);
//# sourceMappingURL=direction_types.model.js.map