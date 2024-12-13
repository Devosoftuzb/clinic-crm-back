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
exports.Clinic = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../client/models/client.model");
const direction_model_1 = require("../../directions/models/direction.model");
const doctor_model_1 = require("../../doctor/models/doctor.model");
const employee_model_1 = require("../../employees/models/employee.model");
const room_model_1 = require("../../room/models/room.model");
const user_model_1 = require("../../user/models/user.model");
const visit_model_1 = require("../../visits/models/visit.model");
let Clinic = class Clinic extends sequelize_typescript_1.Model {
};
exports.Clinic = Clinic;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Clinic.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Clinic.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Clinic.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Clinic.prototype, "owner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", user_model_1.User)
], Clinic.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => client_model_1.Client, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "clients", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => direction_model_1.Direction, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "directions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => employee_model_1.Employee, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "employees", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => doctor_model_1.Doctor, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "doctors", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => visit_model_1.Visit, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "visits", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => room_model_1.Room, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "rooms", void 0);
exports.Clinic = Clinic = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'clinic' })
], Clinic);
//# sourceMappingURL=clinic.model.js.map