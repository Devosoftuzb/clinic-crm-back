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
exports.CreateDoctorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDoctorDto {
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
        description: 'Clinic ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "clinic_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Doctor full name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09-09-2024', description: 'Doctor birthday' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+998901234567', description: 'Doctor phone number' }),
    (0, class_validator_1.IsPhoneNumber)(null),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Doctor experience' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDoctorDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john', description: 'Employee login' }),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password', description: 'Employee password' }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'doctor',
        enum: ['doctor', 'lab_technician', 'external_doctor'],
        description: 'Role name',
    }),
    (0, class_validator_1.IsEnum)(['doctor', 'lab_technician', 'external_doctor']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "role", void 0);
//# sourceMappingURL=create-doctor.dto.js.map