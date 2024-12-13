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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    create(clinic_id, createEmployeeDto) {
        return this.employeesService.create(clinic_id, createEmployeeDto);
    }
    findAll(clinic_id) {
        return this.employeesService.findAll(clinic_id);
    }
    paginate(clinic_id, page) {
        return this.employeesService.paginate(clinic_id, page);
    }
    findOne(clinic_id, id) {
        return this.employeesService.findOne(clinic_id, id);
    }
    update(clinic_id, id, updateEmployeeDto) {
        return this.employeesService.update(clinic_id, id, updateEmployeeDto);
    }
    remove(clinic_id, id) {
        return this.employeesService.remove(clinic_id, id);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new employee' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all employees' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate employees' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a employee by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a employee by ID' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a employee by ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "remove", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)('Employee'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map