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
exports.VisitDirectionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const visit_direction_model_1 = require("./models/visit_direction.model");
const sequelize_2 = require("sequelize");
const visit_model_1 = require("../visits/models/visit.model");
let VisitDirectionsService = class VisitDirectionsService {
    constructor(repo, repoVisit) {
        this.repo = repo;
        this.repoVisit = repoVisit;
    }
    async create(createVisitDirectionDto) {
        try {
            let visit_direction = [];
            let totalPrice = 0;
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);
            for (const item of createVisitDirectionDto.list) {
                const lastVisitDirection = await this.repo.findOne({
                    where: {
                        direction_id: item.direction_id,
                        service_id: item.service_id,
                        doctor_id: item.doctor_id,
                        createdAt: {
                            [sequelize_2.Op.between]: [todayStart, todayEnd],
                        },
                    },
                    order: [['line', 'DESC']],
                });
                const line = lastVisitDirection ? lastVisitDirection.line + 1 : 1;
                const createdVisitDirection = await this.repo.create({
                    visit_id: createVisitDirectionDto.visit_id,
                    ...item,
                    line,
                });
                totalPrice += createdVisitDirection.price;
                visit_direction.push(createdVisitDirection);
            }
            const visit = await this.repoVisit.findOne({
                where: {
                    id: createVisitDirectionDto.visit_id,
                },
            });
            if (!visit) {
                throw new common_1.BadRequestException('Visit not found');
            }
            let updatedAmount = visit.amount.map((amountItem) => ({
                ...amountItem,
                total_amount: amountItem.total_amount + totalPrice,
            }));
            for (let i in visit_direction) {
                updatedAmount = updatedAmount.map((amountItem) => ({
                    ...amountItem,
                    [visit_direction[i].service_id]: visit_direction[i].price,
                }));
            }
            await visit.update({ amount: updatedAmount });
            return {
                message: 'Visit direction created successfully',
                visit_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create visit direction. Please try again later', error);
        }
    }
    async findAll() {
        try {
            const visit_directions = await this.repo.findAll();
            return {
                message: 'Visit directions retrieved successfully',
                visit_directions,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve visit directions. Please try again later', error);
        }
    }
    async paginate(page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const visit_directions = await this.repo.findAll({ offset, limit });
            const total_count = await this.repo.count();
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Visit directions retrieved successfully',
                data: {
                    records: visit_directions,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve direction types. Please try again later', error);
        }
    }
    async findOne(id) {
        try {
            const visit_direction = await this.repo.findByPk(id, {
                include: { all: true },
            });
            if (!visit_direction) {
                throw new common_1.BadRequestException(`Visit direction with id ${id} not found`);
            }
            return {
                message: 'Visit direction retrieved successfully',
                visit_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve visit direction. Please try again later', error);
        }
    }
    async update(id, updateVisitDirectionDto) {
        try {
            const visitDirection = await this.findOne(id);
            await visitDirection.visit_direction.update(updateVisitDirectionDto);
            if (!visitDirection.visit_direction.status) {
                const visit = await this.repoVisit.findOne({
                    where: { id: updateVisitDirectionDto.visit_id },
                });
                if (!visit) {
                    throw new common_1.BadRequestException('Visit not found');
                }
                let amount = 0;
                const updatedAmount = visit.amount.map((amountItem) => {
                    const serviceId = visitDirection.visit_direction.service_id;
                    if (serviceId in amountItem) {
                        const serviceAmount = amountItem[serviceId];
                        const newTotalAmount = amountItem.total_amount - serviceAmount;
                        amount = newTotalAmount;
                        const { [serviceId]: _, ...rest } = amountItem;
                        return { total_amount: newTotalAmount, ...rest };
                    }
                    return amountItem;
                });
                updatedAmount[0].total_amount = amount;
                await visit.update({ amount: updatedAmount });
            }
            return {
                message: 'Visit direction updated successfully',
                visit_direction: visitDirection.visit_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update visit direction. Please try again later', error);
        }
    }
    async remove(id) {
        try {
            await this.repo.destroy({ where: { id } });
            return {
                message: 'Visit direction deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete visit direction. Please try again later', error);
        }
    }
};
exports.VisitDirectionsService = VisitDirectionsService;
exports.VisitDirectionsService = VisitDirectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(visit_direction_model_1.VisitDirection)),
    __param(1, (0, sequelize_1.InjectModel)(visit_model_1.Visit)),
    __metadata("design:paramtypes", [Object, Object])
], VisitDirectionsService);
//# sourceMappingURL=visit_directions.service.js.map