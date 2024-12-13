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
exports.DirectionTypesController = void 0;
const common_1 = require("@nestjs/common");
const direction_types_service_1 = require("./direction_types.service");
const create_direction_type_dto_1 = require("./dto/create-direction_type.dto");
const update_direction_type_dto_1 = require("./dto/update-direction_type.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let DirectionTypesController = class DirectionTypesController {
    constructor(directionTypesService) {
        this.directionTypesService = directionTypesService;
    }
    create(createDirectionTypeDto) {
        return this.directionTypesService.create(createDirectionTypeDto);
    }
    findAll() {
        return this.directionTypesService.findAll();
    }
    paginate(page) {
        return this.directionTypesService.paginate(page);
    }
    findOne(id) {
        return this.directionTypesService.findOne(+id);
    }
    update(id, updateDirectionTypeDto) {
        return this.directionTypesService.update(+id, updateDirectionTypeDto);
    }
    remove(id) {
        return this.directionTypesService.remove(+id);
    }
};
exports.DirectionTypesController = DirectionTypesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new direction type' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_direction_type_dto_1.CreateDirectionTypeDto]),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all direction types' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate direction types' }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a direction type by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a direction type by ID' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_direction_type_dto_1.UpdateDirectionTypeDto]),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a direction type by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DirectionTypesController.prototype, "remove", null);
exports.DirectionTypesController = DirectionTypesController = __decorate([
    (0, swagger_1.ApiTags)('Direction Type'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, roles_auth_decorator_1.Roles)('manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('direction-type'),
    __metadata("design:paramtypes", [direction_types_service_1.DirectionTypesService])
], DirectionTypesController);
//# sourceMappingURL=direction_types.controller.js.map