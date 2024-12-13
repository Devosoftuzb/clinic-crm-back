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
exports.TbodyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tbody_model_1 = require("./models/tbody.model");
let TbodyService = class TbodyService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createTbodyDto) {
        try {
            const thead = await this.repo.create(createTbodyDto);
            return {
                message: 'Thead created successfully',
                thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create thead. Please try again later');
        }
    }
    async findAll() {
        try {
            const theads = await this.repo.findAll();
            return {
                message: 'Thead retrieved successfully',
                theads,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later');
        }
    }
    async paginate(page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const theads = await this.repo.findAll({
                offset,
                limit,
            });
            const total_count = await this.repo.count();
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Thead retrieved successfully',
                data: {
                    records: theads,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const thead = await this.repo.findOne({
                where: { id },
                include: { all: true },
            });
            if (!thead) {
                throw new common_1.NotFoundException(`Thead with id ${id} not found`);
            }
            return {
                message: 'Thead retrieved successfully',
                thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later');
        }
    }
    async update(id, updateTbodyDto) {
        try {
            const thead = await this.findOne(id);
            await thead.thead.update(updateTbodyDto);
            return {
                message: 'Thead updated successfully',
                thead: thead.thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update thead. Please try again later');
        }
    }
    async remove(id) {
        try {
            await this.repo.destroy({ where: { id } });
            return {
                message: 'Thead deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete thead. Please try again later');
        }
    }
};
exports.TbodyService = TbodyService;
exports.TbodyService = TbodyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tbody_model_1.Tbody)),
    __metadata("design:paramtypes", [Object])
], TbodyService);
//# sourceMappingURL=tbody.service.js.map