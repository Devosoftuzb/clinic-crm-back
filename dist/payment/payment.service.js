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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const payment_model_1 = require("./models/payment.model");
const sequelize_2 = require("sequelize");
const client_model_1 = require("../client/models/client.model");
const visit_model_1 = require("../visits/models/visit.model");
const payment_method_model_1 = require("../payment_method/models/payment_method.model");
let PaymentService = class PaymentService {
    constructor(repo, repoClient, repoVisit, repoPaymentMethod) {
        this.repo = repo;
        this.repoClient = repoClient;
        this.repoVisit = repoVisit;
        this.repoPaymentMethod = repoPaymentMethod;
    }
    async create(createPaymentDto) {
        const student = await this.repo.create(createPaymentDto);
        return {
            message: 'Payment created successfully',
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
    async filter(clinic_id, start_date, end_date, page) {
        try {
            const limit = 15;
            const offset = Math.max(page - 1, 0) * limit;
            const startOfDay = new Date(start_date);
            startOfDay.setHours(0, 0, 0, 0);
            startOfDay.setHours(startOfDay.getHours() + 5);
            const endOfDay = new Date(end_date);
            endOfDay.setHours(23, 59, 59, 999);
            endOfDay.setHours(endOfDay.getHours() + 5);
            const payments = await this.repo.findAll({
                where: {
                    clinic_id,
                    createdAt: { [sequelize_2.Op.between]: [startOfDay, endOfDay] },
                },
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            if (!payments.length) {
                throw new common_1.NotFoundException('No payments found for the specified criteria.');
            }
            const total_count = await this.repo.count({
                where: {
                    clinic_id,
                    createdAt: { [sequelize_2.Op.between]: [startOfDay, endOfDay] },
                },
            });
            const visitIds = payments.map((p) => p.visit_id);
            const visits = await this.repoVisit.findAll({
                where: { id: { [sequelize_2.Op.in]: visitIds } },
            });
            const clientIds = visits.map((v) => v.client_id);
            const clients = await this.repoClient.findAll({
                where: { id: { [sequelize_2.Op.in]: clientIds } },
            });
            const paymentMethods = await this.repoPaymentMethod.findAll({
                where: { clinic_id },
            });
            const formattedPayments = payments.map((payment) => {
                const visit = visits.find((v) => v.id === payment.visit_id);
                const client = clients.find((c) => c.id === visit?.client_id);
                const method = paymentMethods.find((pm) => pm.id === payment.payment_method_id);
                const adjustedPaymentDate = new Date(payment.createdAt);
                adjustedPaymentDate.setHours(adjustedPaymentDate.getHours() + 5);
                return {
                    payment_id: payment.id,
                    visit_id: payment.visit_id,
                    client_id: visit?.client_id,
                    client_name: client?.full_name || 'Unknown',
                    price: payment.price,
                    payment_date: adjustedPaymentDate,
                    payment_method: method?.name || 'Unknown',
                };
            });
            const total_amount = payments.reduce((sum, p) => sum + p.price, 0);
            const amount = paymentMethods.map((pm) => ({
                [pm.name]: payments
                    .filter((p) => p.payment_method_id === pm.id)
                    .reduce((sum, p) => sum + p.price, 0),
            }));
            return {
                status: 200,
                message: 'Payments retrieved successfully',
                data: {
                    records: formattedPayments,
                    amount: [...amount, { total_amount }],
                    pagination: {
                        currentPage: page,
                        total_pages: Math.ceil(total_count / limit),
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve payments. Please try again later.');
        }
    }
    async findOne(id, clinic_id) {
        const payment = await this.repo.findOne({
            where: {
                id,
                clinic_id,
            },
            include: { all: true },
        });
        if (!payment) {
            throw new common_1.BadRequestException(`Payment with id ${id} not found`);
        }
        return payment;
    }
    async update(id, clinic_id, updatePaymentDto) {
        const payment = await this.findOne(id, clinic_id);
        await payment.update(updatePaymentDto);
        return {
            message: 'Payment updated successfully',
            payment,
        };
    }
    async remove(id, clinic_id) {
        const payment = await this.findOne(id, clinic_id);
        await payment.destroy();
        return {
            message: 'Payment removed successfully',
        };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(payment_model_1.Payment)),
    __param(1, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(2, (0, sequelize_1.InjectModel)(visit_model_1.Visit)),
    __param(3, (0, sequelize_1.InjectModel)(payment_method_model_1.PaymentMethod)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], PaymentService);
//# sourceMappingURL=payment.service.js.map