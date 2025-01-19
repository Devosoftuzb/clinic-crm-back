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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const payment_method_model_1 = require("./models/payment_method.model");
let PaymentMethodService = class PaymentMethodService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createPaymentMethodDto) {
        const student = await this.repo.create(createPaymentMethodDto);
        return {
            message: 'Payment method created successfully',
            student,
        };
    }
    async findAll(clinic_id) {
        return await this.repo.findAll({
            where: { clinic_id },
        });
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const user = await this.repo.findAll({
                where: { clinic_id: clinic_id },
                include: { all: true },
                offset,
                limit,
            });
            const total_count = await this.repo.count();
            const total_pages = Math.ceil(total_count / limit);
            const res = {
                status: 200,
                data: {
                    records: user,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
            return res;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id, clinic_id) {
        const paymentMethod = await this.repo.findOne({
            where: {
                id,
                clinic_id,
            },
            include: { all: true },
        });
        if (!paymentMethod) {
            throw new common_1.BadRequestException(`Payment method with id ${id} not found`);
        }
        return paymentMethod;
    }
    async update(id, clinic_id, updatePaymentMethodDto) {
        const paymentMethod = await this.findOne(id, clinic_id);
        await paymentMethod.update(updatePaymentMethodDto);
        return {
            message: 'Payment method updated successfully',
            paymentMethod,
        };
    }
    async remove(id, clinic_id) {
        const paymentMethod = await this.findOne(id, clinic_id);
        await paymentMethod.destroy();
        return {
            message: 'Payment method removed successfully',
        };
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payment_method_model_1.PaymentMethod)),
    __metadata("design:paramtypes", [Object])
], PaymentMethodService);
//# sourceMappingURL=payment_method.service.js.map