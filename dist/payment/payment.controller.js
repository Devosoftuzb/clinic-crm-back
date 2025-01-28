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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(createPaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }
    findAll(clinic_id) {
        return this.paymentService.findAll(clinic_id);
    }
    paginate(page, clinic_id) {
        return this.paymentService.paginate(clinic_id, page);
    }
    filter(clinic_id, start_date, end_date, page) {
        return this.paymentService.filter(clinic_id, start_date, end_date, page);
    }
    findOne(id, clinic_id) {
        return this.paymentService.findOne(+id, clinic_id);
    }
    update(id, clinic_id, updatePaymentDto) {
        return this.paymentService.update(+id, clinic_id, updatePaymentDto);
    }
    remove(id, clinic_id) {
        return this.paymentService.remove(+id, clinic_id);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment create' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment view all by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment paginate' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment paginate' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id/:start_date/:end_date/page'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __param(1, (0, common_1.Param)('start_date')),
    __param(2, (0, common_1.Param)('end_date')),
    __param(3, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "filter", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment view by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment update by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment remove by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "remove", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map