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
exports.Tbody = void 0;
const thead_model_1 = require("./../../thead/models/thead.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let Tbody = class Tbody extends sequelize_typescript_1.Model {
};
exports.Tbody = Tbody;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Tbody.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => thead_model_1.Thead),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Tbody.prototype, "thead_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => thead_model_1.Thead, {
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", thead_model_1.Thead)
], Tbody.prototype, "thead", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
    }),
    __metadata("design:type", Object)
], Tbody.prototype, "trow", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Tbody.prototype, "result", void 0);
exports.Tbody = Tbody = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'tbody' })
], Tbody);
//# sourceMappingURL=tbody.model.js.map