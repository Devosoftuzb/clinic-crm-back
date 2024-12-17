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
exports.Visit = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../client/models/client.model");
const clinic_model_1 = require("../../clinic/models/clinic.model");
const doctor_model_1 = require("../../doctor/models/doctor.model");
const room_model_1 = require("../../room/models/room.model");
const visit_direction_model_1 = require("../../visit_directions/models/visit_direction.model");
let Visit = class Visit extends sequelize_typescript_1.Model {
};
exports.Visit = Visit;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Visit.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => clinic_model_1.Clinic),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Visit.prototype, "clinic_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => clinic_model_1.Clinic),
    __metadata("design:type", clinic_model_1.Clinic)
], Visit.prototype, "clinic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Visit.prototype, "client_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client),
    __metadata("design:type", client_model_1.Client)
], Visit.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Visit.prototype, "visit_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        values: ['outpatient', 'hospital'],
        allowNull: false,
    }),
    __metadata("design:type", String)
], Visit.prototype, "stay_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.JSON),
        allowNull: true,
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], Visit.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Visit.prototype, "total_balance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Visit.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => room_model_1.Room),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Visit.prototype, "room_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => room_model_1.Room),
    __metadata("design:type", room_model_1.Room)
], Visit.prototype, "room", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Visit.prototype, "start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Visit.prototype, "end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Visit.prototype, "is_partner", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Visit.prototype, "is_payment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Visit.prototype, "room_payment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => doctor_model_1.Doctor),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Visit.prototype, "doctor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => doctor_model_1.Doctor),
    __metadata("design:type", doctor_model_1.Doctor)
], Visit.prototype, "doctor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => visit_direction_model_1.VisitDirection),
    __metadata("design:type", Array)
], Visit.prototype, "visitDirections", void 0);
exports.Visit = Visit = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'visits' })
], Visit);
//# sourceMappingURL=visit.model.js.map