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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    create(clinic_id, createDoctorDto) {
        return this.doctorService.create(clinic_id, createDoctorDto);
    }
    findAll(clinic_id) {
        return this.doctorService.findAll(clinic_id);
    }
    findClinicDoctors(clinic_id) {
        return this.doctorService.findClinicDoctors(clinic_id);
    }
    findExternalDoctors(clinic_id) {
        return this.doctorService.findExternalDoctors(clinic_id);
    }
    paginate(clinic_id, page) {
        return this.doctorService.paginate(clinic_id, page);
    }
    findOne(clinic_id, id) {
        return this.doctorService.findOne(clinic_id, id);
    }
    update(clinic_id, id, updateDoctorDto) {
        return this.doctorService.update(clinic_id, id, updateDoctorDto);
    }
    remove(clinic_id, id) {
        return this.doctorService.remove(clinic_id, id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor' }),
    (0, common_1.Post)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all doctors' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'accountant'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all clinic doctors' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'accountant'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('clinicDoctors/:clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findClinicDoctors", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all external doctors' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'accountant'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('externalDoctors/:clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findExternalDoctors", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate doctors' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'accountant'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a doctor by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a doctor by ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctor'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map