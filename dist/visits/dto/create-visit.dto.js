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
exports.CreateVisitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVisitDto {
}
exports.CreateVisitDto = CreateVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
        description: 'Clinic ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "clinic_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
        description: 'Client ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-10-15', description: 'Visit date' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "visit_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'outpatient',
        enum: ['outpatient', 'hospital'],
        description: 'Stay type',
    }),
    (0, class_validator_1.IsEnum)(['outpatient', 'hospital']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "stay_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000000, description: 'Total balance' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateVisitDto.prototype, "total_balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Discount' }),
    __metadata("design:type", Number)
], CreateVisitDto.prototype, "discount", void 0);
//# sourceMappingURL=create-visit.dto.js.map