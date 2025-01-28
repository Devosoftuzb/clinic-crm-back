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
exports.ClinicController = void 0;
const common_1 = require("@nestjs/common");
const clinic_service_1 = require("./clinic.service");
const create_clinic_dto_1 = require("./dto/create-clinic.dto");
const update_clinic_dto_1 = require("./dto/update-clinic.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let ClinicController = class ClinicController {
    constructor(clinicService) {
        this.clinicService = clinicService;
    }
    create(createClinicDto) {
        return this.clinicService.create(createClinicDto);
    }
    findAll() {
        return this.clinicService.findAll();
    }
    paginate(page) {
        return this.clinicService.paginate(page);
    }
    findOne(id) {
        return this.clinicService.findOne(id);
    }
    update(id, updateUpdateDto) {
        return this.clinicService.update(id, updateUpdateDto);
    }
    remove(id) {
        return this.clinicService.remove(id);
    }
};
exports.ClinicController = ClinicController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new clinic' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinic_dto_1.CreateClinicDto]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all clinics' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate clinics' }),
    (0, roles_auth_decorator_1.Roles)('superadmin', 'admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a clinic by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a clinic by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clinic_dto_1.UpdateClinicDto]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a clinic by ID' }),
    (0, roles_auth_decorator_1.Roles)('superadmin', 'admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "remove", null);
exports.ClinicController = ClinicController = __decorate([
    (0, swagger_1.ApiTags)('Clinic'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('clinic'),
    __metadata("design:paramtypes", [clinic_service_1.ClinicService])
], ClinicController);
//# sourceMappingURL=clinic.controller.js.map