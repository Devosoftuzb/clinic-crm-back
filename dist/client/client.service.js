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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const client_model_1 = require("./models/client.model");
let ClientService = class ClientService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(clinic_id, createClientDto) {
        try {
            if (clinic_id !== createClientDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided client clinic ID');
            }
            const client = await this.repo.create(createClientDto);
            return {
                message: 'Client created successfully',
                client,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create client. Please try again later');
        }
    }
    async findAll(clinic_id) {
        try {
            const clients = await this.repo.findAll({ where: { clinic_id } });
            if (!clients || clients.length === 0) {
                throw new common_1.NotFoundException('No clients found for the specified clinic ID');
            }
            return {
                message: 'Clients retrieved successfully',
                clients,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clients. Please try again later');
        }
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const clients = await this.repo.findAll({
                where: { clinic_id },
                offset,
                limit,
            });
            if (!clients || clients.length === 0) {
                throw new common_1.NotFoundException('No clients found for the specified clinic ID');
            }
            const total_count = await this.repo.count({ where: { clinic_id } });
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Clients retrieved successfully',
                data: {
                    records: clients,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clients. Please try again later');
        }
    }
    async findOne(clinic_id, id) {
        try {
            const client = await this.repo.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!client) {
                throw new common_1.NotFoundException(`Client with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Client retrieved successfully',
                client,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clients. Please try again later');
        }
    }
    async update(clinic_id, id, updateClientDto) {
        try {
            const client = await this.findOne(clinic_id, id);
            await client.client.update(updateClientDto);
            return {
                message: 'Client updated successfully',
                client: client.client,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update client. Please try again later');
        }
    }
    async remove(clinic_id, id) {
        try {
            const client = await this.findOne(clinic_id, id);
            await client.client.destroy();
            return {
                message: 'Client deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete client. Please try again later');
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object])
], ClientService);
//# sourceMappingURL=client.service.js.map