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
exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePaymentDto {
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27', description: 'Clinic ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "clinic_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Visit ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "visit_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Room ID' }),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Direction ID' }),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "direction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Payment method ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "payment_method_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000, description: 'Payment  price' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "price", void 0);
//# sourceMappingURL=create-payment.dto.js.map