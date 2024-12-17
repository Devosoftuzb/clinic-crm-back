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
exports.VisitsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const visit_model_1 = require("./models/visit.model");
const sequelize_2 = require("sequelize");
const room_model_1 = require("../room/models/room.model");
const client_model_1 = require("../client/models/client.model");
let VisitsService = class VisitsService {
    constructor(repo, repoRoom, repoClient) {
        this.repo = repo;
        this.repoRoom = repoRoom;
        this.repoClient = repoClient;
    }
    async create(clinic_id, createVisitDto) {
        try {
            if (clinic_id !== createVisitDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided visit clinic ID');
            }
            const firstVisit = await this.repo.findOne({
                where: {
                    clinic_id: clinic_id,
                    client_id: createVisitDto.client_id,
                },
                order: [['createdAt', 'ASC']],
            });
            if (!firstVisit) {
                createVisitDto.discount = 0;
            }
            else {
                const firstVisitDate = new Date(firstVisit.createdAt);
                const oneYearAfterFirstVisit = new Date(firstVisitDate);
                oneYearAfterFirstVisit.setFullYear(firstVisitDate.getFullYear() + 1);
                const visits = await this.repo.findAll({
                    where: {
                        clinic_id: clinic_id,
                        client_id: createVisitDto.client_id,
                        createdAt: {
                            [sequelize_2.Op.gte]: firstVisitDate,
                            [sequelize_2.Op.lte]: oneYearAfterFirstVisit,
                        },
                    },
                });
                let discount = 0;
                if (visits.length == 1) {
                    discount = 5;
                }
                else if (visits.length >= 2) {
                    discount = 10;
                }
                createVisitDto.discount = discount;
            }
            const visit = await this.repo.create(createVisitDto);
            visit.amount = [{ total_amount: 0 }];
            if (visit.room_id !== null) {
                const room = await this.repoRoom.findOne({
                    where: { id: visit.room_id },
                });
                const startDate = new Date(visit.start_date);
                const endDate = new Date(visit.end_date);
                const timeDifference = endDate.getTime() - startDate.getTime();
                const daysDifference = timeDifference / (1000 * 3600 * 24);
                const roomPrice = room.price * daysDifference;
                const updatedAmount = visit.amount.map((amountItem) => ({
                    ...amountItem,
                    room_price: roomPrice,
                    total_amount: amountItem.total_amount + roomPrice,
                }));
                await this.repo.update({ ...createVisitDto, amount: updatedAmount }, { where: { id: visit.id } });
                const updatedVisit = await this.repo.findOne({
                    where: { id: visit.id },
                });
                return {
                    message: 'Visit created successfully',
                    visit: updatedVisit,
                };
            }
            else {
                await visit.update({ amount: visit.amount, ...createVisitDto });
                return {
                    message: 'Visit created successfully',
                    visit,
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to create visit. Please try again later');
        }
    }
    async findAll(clinic_id) {
        try {
            const visits = await this.repo.findAll({
                where: { clinic_id },
                order: [['createdAt', 'DESC']],
            });
            if (!visits || visits.length === 0) {
                throw new common_1.NotFoundException('No visits found for the specified clinic ID');
            }
            return {
                message: 'Visits retrieved successfully',
                visits,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve visits. Please try again later');
        }
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const visits = await this.repo.findAll({
                where: { clinic_id },
                offset,
                limit,
            });
            if (!visits || visits.length === 0) {
                throw new common_1.NotFoundException('No visits found for the specified clinic ID');
            }
            const total_count = await this.repo.count({ where: { clinic_id } });
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Visits retrieved successfully',
                data: {
                    records: visits,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve visits. Please try again later');
        }
    }
    async paginateOneDayVisit(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const visits = await this.repo.findAll({
                where: {
                    clinic_id,
                    createdAt: {
                        [sequelize_2.Op.between]: [startOfDay, endOfDay],
                    },
                },
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            });
            if (!visits || visits.length === 0) {
                throw new common_1.NotFoundException('No visits found for the specified clinic ID');
            }
            const total_count = await this.repo.count({
                where: {
                    clinic_id,
                    createdAt: {
                        [sequelize_2.Op.between]: [startOfDay, endOfDay],
                    },
                },
            });
            const total_pages = Math.ceil(total_count / limit);
            const formattedVisits = await Promise.all(visits.map(async (visit) => {
                const client = await this.repoClient.findOne({
                    where: { id: visit.client_id },
                });
                return {
                    visit_id: visit.id,
                    client_name: client ? client.full_name : 'Unknown',
                    visit_date: visit.visit_date,
                    is_payment: visit.is_payment,
                    total_amount: visit.amount[0].total_amount,
                };
            }));
            return {
                status: 200,
                message: 'Visits retrieved successfully',
                data: {
                    records: formattedVisits,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to retrieve visits. Please try again later');
        }
    }
    async findOne(clinic_id, id) {
        try {
            const visit = await this.repo.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!visit) {
                throw new common_1.NotFoundException(`Visit with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Visit retrieved successfully',
                visit,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve visits. Please try again later');
        }
    }
    async update(clinic_id, id, updateVisitDto) {
        try {
            const visit = await this.findOne(clinic_id, id);
            await visit.visit.update(updateVisitDto);
            return {
                message: 'Visit updated successfully',
                visit: visit.visit,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update visit. Please try again later');
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repo.destroy({ where: { clinic_id, id } });
            return {
                message: 'Visit deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete visit. Please try again later');
        }
    }
};
exports.VisitsService = VisitsService;
exports.VisitsService = VisitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(visit_model_1.Visit)),
    __param(1, (0, sequelize_1.InjectModel)(room_model_1.Room)),
    __param(2, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object, Object, Object])
], VisitsService);
//# sourceMappingURL=visits.service.js.map