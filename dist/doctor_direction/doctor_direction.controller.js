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
exports.DoctorDirectionController = void 0;
const common_1 = require("@nestjs/common");
const doctor_direction_service_1 = require("./doctor_direction.service");
const create_doctor_direction_dto_1 = require("./dto/create-doctor_direction.dto");
const update_doctor_direction_dto_1 = require("./dto/update-doctor_direction.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let DoctorDirectionController = class DoctorDirectionController {
    constructor(doctorDirectionService) {
        this.doctorDirectionService = doctorDirectionService;
    }
    create(createDoctorDirectionDto) {
        return this.doctorDirectionService.create(createDoctorDirectionDto);
    }
    findAll() {
        return this.doctorDirectionService.findAll();
    }
    paginate(page) {
        return this.doctorDirectionService.paginate(page);
    }
    findOne(id) {
        return this.doctorDirectionService.findOne(+id);
    }
    update(id, updateDoctorDirectionDto) {
        return this.doctorDirectionService.update(+id, updateDoctorDirectionDto);
    }
    remove(id) {
        return this.doctorDirectionService.remove(+id);
    }
};
exports.DoctorDirectionController = DoctorDirectionController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor direction' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_direction_dto_1.CreateDoctorDirectionDto]),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all doctor directions' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate doctor directions' }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a doctor direction by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor direction by ID' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_direction_dto_1.UpdateDoctorDirectionDto]),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a doctor direction by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorDirectionController.prototype, "remove", null);
exports.DoctorDirectionController = DoctorDirectionController = __decorate([
    (0, swagger_1.ApiTags)('Doctor Direction'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, roles_auth_decorator_1.Roles)('manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('doctor-direction'),
    __metadata("design:paramtypes", [doctor_direction_service_1.DoctorDirectionService])
], DoctorDirectionController);
//# sourceMappingURL=doctor_direction.controller.js.map