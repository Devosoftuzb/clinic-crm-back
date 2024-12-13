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
exports.UpdateVisitDirectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateVisitDirectionDto {
}
exports.UpdateVisitDirectionDto = UpdateVisitDirectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Visit ID' }),
    __metadata("design:type", Number)
], UpdateVisitDirectionDto.prototype, "visit_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Direction ID' }),
    __metadata("design:type", Number)
], UpdateVisitDirectionDto.prototype, "direction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Direction Type ID' }),
    __metadata("design:type", Number)
], UpdateVisitDirectionDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Doctor ID' }),
    __metadata("design:type", String)
], UpdateVisitDirectionDto.prototype, "doctor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200000, description: 'Price' }),
    __metadata("design:type", Number)
], UpdateVisitDirectionDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is Payment' }),
    __metadata("design:type", Boolean)
], UpdateVisitDirectionDto.prototype, "is_payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is Checked' }),
    __metadata("design:type", Boolean)
], UpdateVisitDirectionDto.prototype, "is_checked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'diagnosis', description: 'Client diagnosis' }),
    __metadata("design:type", String)
], UpdateVisitDirectionDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'retsept', description: 'Client retsept' }),
    __metadata("design:type", String)
], UpdateVisitDirectionDto.prototype, "retsept", void 0);
//# sourceMappingURL=update-visit_direction.dto.js.map