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
exports.VisitDirectionsController = void 0;
const common_1 = require("@nestjs/common");
const visit_directions_service_1 = require("./visit_directions.service");
const create_visit_direction_dto_1 = require("./dto/create-visit_direction.dto");
const update_visit_direction_dto_1 = require("./dto/update-visit_direction.dto");
const swagger_1 = require("@nestjs/swagger");
let VisitDirectionsController = class VisitDirectionsController {
    constructor(visitDirectionsService) {
        this.visitDirectionsService = visitDirectionsService;
    }
    create(createVisitDirectionDto) {
        return this.visitDirectionsService.create(createVisitDirectionDto);
    }
    findAll() {
        return this.visitDirectionsService.findAll();
    }
    paginate(page) {
        return this.visitDirectionsService.paginate(page);
    }
    findOne(id) {
        return this.visitDirectionsService.findOne(+id);
    }
    update(id, updateVisitDirectionDto) {
        return this.visitDirectionsService.update(+id, updateVisitDirectionDto);
    }
    remove(id) {
        return this.visitDirectionsService.remove(+id);
    }
};
exports.VisitDirectionsController = VisitDirectionsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new direction type' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_visit_direction_dto_1.CreateVisitDirectionDto]),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all direction types' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate direction types' }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a direction type by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a direction type by ID' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_visit_direction_dto_1.UpdateVisitDirectionDto]),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a direction type by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitDirectionsController.prototype, "remove", null);
exports.VisitDirectionsController = VisitDirectionsController = __decorate([
    (0, swagger_1.ApiTags)('Visit Direction'),
    (0, common_1.Controller)('visit-directions'),
    __metadata("design:paramtypes", [visit_directions_service_1.VisitDirectionsService])
], VisitDirectionsController);
//# sourceMappingURL=visit_directions.controller.js.map