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
exports.VisitsController = void 0;
const common_1 = require("@nestjs/common");
const visits_service_1 = require("./visits.service");
const create_visit_dto_1 = require("./dto/create-visit.dto");
const update_visit_dto_1 = require("./dto/update-visit.dto");
const swagger_1 = require("@nestjs/swagger");
let VisitsController = class VisitsController {
    constructor(visitsService) {
        this.visitsService = visitsService;
    }
    create(clinic_id, createVisitDto) {
        return this.visitsService.create(clinic_id, createVisitDto);
    }
    findAll(clinic_id) {
        return this.visitsService.findAll(clinic_id);
    }
    paginate(clinic_id, page) {
        return this.visitsService.paginate(clinic_id, page);
    }
    filter(clinic_id, start_date, end_date, page) {
        return this.visitsService.filter(clinic_id, start_date, end_date, page);
    }
    findOne(clinic_id, id) {
        return this.visitsService.findOne(clinic_id, +id);
    }
    update(clinic_id, id, updateVisitDto) {
        return this.visitsService.update(clinic_id, +id, updateVisitDto);
    }
    remove(clinic_id, id) {
        return this.visitsService.remove(clinic_id, +id);
    }
};
exports.VisitsController = VisitsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new visit' }),
    (0, common_1.Post)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_visit_dto_1.CreateVisitDto]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View all visits' }),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate visits' }),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paginate visits' }),
    (0, common_1.Get)(':clinic_id/:start_date/:end_date/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('start_date')),
    __param(2, (0, common_1.Param)('end_date')),
    __param(3, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "filter", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a visit by ID' }),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a visit by ID' }),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_visit_dto_1.UpdateVisitDto]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a visit by ID' }),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VisitsController.prototype, "remove", null);
exports.VisitsController = VisitsController = __decorate([
    (0, swagger_1.ApiTags)('Visit'),
    (0, common_1.Controller)('visits'),
    __metadata("design:paramtypes", [visits_service_1.VisitsService])
], VisitsController);
//# sourceMappingURL=visits.controller.js.map