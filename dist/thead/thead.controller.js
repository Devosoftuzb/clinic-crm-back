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
exports.TheadController = void 0;
const common_1 = require("@nestjs/common");
const thead_service_1 = require("./thead.service");
const create_thead_dto_1 = require("./dto/create-thead.dto");
const update_thead_dto_1 = require("./dto/update-thead.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let TheadController = class TheadController {
    constructor(theadService) {
        this.theadService = theadService;
    }
    create(clinic_id, createTheadDto) {
        return this.theadService.create(clinic_id, createTheadDto);
    }
    findAll(clinic_id) {
        return this.theadService.findAll(clinic_id);
    }
    paginate(clinic_id, page) {
        return this.theadService.paginate(clinic_id, page);
    }
    findOne(clinic_id, id) {
        return this.theadService.findOne(clinic_id, +id);
    }
    update(clinic_id, id, updateTheadDto) {
        return this.theadService.update(clinic_id, +id, updateTheadDto);
    }
    remove(clinic_id, id) {
        return this.theadService.remove(clinic_id, +id);
    }
};
exports.TheadController = TheadController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new thead' }),
    (0, common_1.Post)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_thead_dto_1.CreateTheadDto]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all theads' }),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate theads' }),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a thead by ID' }),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a thead by ID' }),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_thead_dto_1.UpdateTheadDto]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a thead by ID' }),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TheadController.prototype, "remove", null);
exports.TheadController = TheadController = __decorate([
    (0, swagger_1.ApiTags)('Thead'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, roles_auth_decorator_1.Roles)('manager', 'administrator', 'doctor', 'accountant', 'storekeeper', 'lab_technician'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('thead'),
    __metadata("design:paramtypes", [thead_service_1.TheadService])
], TheadController);
//# sourceMappingURL=thead.controller.js.map