"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const sequelize_1 = require("@nestjs/sequelize");
const payment_model_1 = require("./models/payment.model");
const jwt_1 = require("@nestjs/jwt");
const visit_model_1 = require("../visits/models/visit.model");
const client_model_1 = require("../client/models/client.model");
const payment_method_model_1 = require("../payment_method/models/payment_method.model");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([payment_model_1.Payment, visit_model_1.Visit, client_model_1.Client, payment_method_model_1.PaymentMethod]), jwt_1.JwtModule],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map