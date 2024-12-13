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
exports.TbodyController = void 0;
const common_1 = require("@nestjs/common");
const tbody_service_1 = require("./tbody.service");
const create_tbody_dto_1 = require("./dto/create-tbody.dto");
const update_tbody_dto_1 = require("./dto/update-tbody.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let TbodyController = class TbodyController {
    constructor(tbodyService) {
        this.tbodyService = tbodyService;
    }
    create(createTbodyDto) {
        return this.tbodyService.create(createTbodyDto);
    }
    findAll() {
        return this.tbodyService.findAll();
    }
    paginate(page) {
        return this.tbodyService.paginate(page);
    }
    findOne(id) {
        return this.tbodyService.findOne(+id);
    }
    update(id, updateTbodyDto) {
        return this.tbodyService.update(+id, updateTbodyDto);
    }
    remove(id) {
        return this.tbodyService.remove(+id);
    }
};
exports.TbodyController = TbodyController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tbody' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tbody_dto_1.CreateTbodyDto]),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all tbodys' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate tbodys' }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a tbody by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a tbody by ID' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tbody_dto_1.UpdateTbodyDto]),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a tbody by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TbodyController.prototype, "remove", null);
exports.TbodyController = TbodyController = __decorate([
    (0, swagger_1.ApiTags)('Tbody'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, roles_auth_decorator_1.Roles)('manager', 'administrator', 'doctor', 'accountant', 'storekeeper', 'lab_technician'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tbody'),
    __metadata("design:paramtypes", [tbody_service_1.TbodyService])
], TbodyController);
//# sourceMappingURL=tbody.controller.js.map