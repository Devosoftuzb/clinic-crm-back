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
exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEmployeeDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
        description: 'Clinic ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "clinic_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Employee full name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-10-17', description: 'Employee birthday' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+998901234567',
        description: 'Employee phone number',
    }),
    (0, class_validator_1.IsPhoneNumber)(null),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john', description: 'Employee login' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password', description: 'Employee password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'manager',
        enum: ['manager', 'administrator', 'accountant', 'storekeeper'],
        description: 'Role name',
    }),
    (0, class_validator_1.IsEnum)(['manager', 'administrator', 'accountant', 'storekeeper']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "role", void 0);
//# sourceMappingURL=create-employee.dto.js.map