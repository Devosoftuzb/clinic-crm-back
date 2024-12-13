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
exports.CreateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
        description: 'Clinic ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "clinic_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15 room', description: 'Room name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Room number seats' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "number_seats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000, description: 'Room price' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "price", void 0);
//# sourceMappingURL=create-room.dto.js.map