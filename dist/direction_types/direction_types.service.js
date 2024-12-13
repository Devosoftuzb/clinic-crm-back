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
exports.DirectionTypesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const direction_types_model_1 = require("./models/direction_types.model");
let DirectionTypesService = class DirectionTypesService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDirectionTypeDto) {
        try {
            const direction_type = await this.repo.create(createDirectionTypeDto);
            return {
                message: 'Direction type created successfully',
                direction_type,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create direction type. Please try again later');
        }
    }
    async findAll() {
        try {
            const direction_types = await this.repo.findAll();
            return {
                message: 'Direction types retrieved successfully',
                direction_types,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve direction types. Please try again later');
        }
    }
    async paginate(page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const direction_types = await this.repo.findAll({ offset, limit });
            const total_count = await this.repo.count();
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Direction types retrieved successfully',
                data: {
                    records: direction_types,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve direction types. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const direction_type = await this.repo.findByPk(id, {
                include: { all: true },
            });
            if (!direction_type) {
                throw new common_1.BadRequestException(`Direction type with id ${id} not found`);
            }
            return {
                message: 'Direction type retrieved successfully',
                direction_type,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve direction type. Please try again later');
        }
    }
    async update(id, updateDirectionTypeDto) {
        try {
            const direction_type = await this.findOne(id);
            await direction_type.direction_type.update(updateDirectionTypeDto);
            return {
                message: 'Direction type updated successfully',
                direction_type: direction_type.direction_type,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update direction type. Please try again later');
        }
    }
    async remove(id) {
        try {
            await this.repo.destroy({ where: { id } });
            return {
                message: 'Direction type deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete direction type. Please try again later');
        }
    }
};
exports.DirectionTypesService = DirectionTypesService;
exports.DirectionTypesService = DirectionTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(direction_types_model_1.DirectionType)),
    __metadata("design:paramtypes", [Object])
], DirectionTypesService);
//# sourceMappingURL=direction_types.service.js.map