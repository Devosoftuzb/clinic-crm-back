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
exports.PaymentMethodController = void 0;
const common_1 = require("@nestjs/common");
const payment_method_service_1 = require("./payment_method.service");
const create_payment_method_dto_1 = require("./dto/create-payment_method.dto");
const update_payment_method_dto_1 = require("./dto/update-payment_method.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth-decorator");
let PaymentMethodController = class PaymentMethodController {
    constructor(paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }
    create(createPaymentMethodDto) {
        return this.paymentMethodService.create(createPaymentMethodDto);
    }
    findAll(clinic_id) {
        return this.paymentMethodService.findAll(clinic_id);
    }
    paginate(page, clinic_id) {
        return this.paymentMethodService.paginate(clinic_id, page);
    }
    findOne(id, clinic_id) {
        return this.paymentMethodService.findOne(+id, clinic_id);
    }
    update(id, clinic_id, updatePaymentMethodDto) {
        return this.paymentMethodService.update(+id, clinic_id, updatePaymentMethodDto);
    }
    remove(id, clinic_id) {
        return this.paymentMethodService.remove(+id, clinic_id);
    }
};
exports.PaymentMethodController = PaymentMethodController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method create' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_method_dto_1.CreatePaymentMethodDto]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method view all by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id'),
    __param(0, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method paginate' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id/page'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "paginate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method view by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper'),
    (0, common_1.Get)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method update by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.Put)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_payment_method_dto_1.UpdatePaymentMethodDto]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment method remove by ID by clinic ID' }),
    (0, roles_auth_decorator_1.Roles)('owner', 'manager'),
    (0, common_1.Delete)(':clinic_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('clinic_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentMethodController.prototype, "remove", null);
exports.PaymentMethodController = PaymentMethodController = __decorate([
    (0, swagger_1.ApiTags)('Payment Method'),
    (0, common_1.Controller)('payment-method'),
    __metadata("design:paramtypes", [payment_method_service_1.PaymentMethodService])
], PaymentMethodController);
//# sourceMappingURL=payment_method.controller.js.map