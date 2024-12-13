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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const room_model_1 = require("./models/room.model");
let RoomService = class RoomService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(clinic_id, createRoomDto) {
        try {
            if (clinic_id !== createRoomDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided room clinic ID');
            }
            const room = await this.repo.create(createRoomDto);
            return {
                message: 'Room created successfully',
                room,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create room. Please try again later');
        }
    }
    async findAll(clinic_id) {
        try {
            const rooms = await this.repo.findAll({ where: { clinic_id } });
            if (!rooms || rooms.length === 0) {
                throw new common_1.NotFoundException('No rooms found for the specified clinic ID');
            }
            return {
                message: 'Rooms retrieved successfully',
                rooms,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve rooms. Please try again later');
        }
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const rooms = await this.repo.findAll({
                where: { clinic_id },
                offset,
                limit,
            });
            if (!rooms || rooms.length === 0) {
                throw new common_1.NotFoundException('No rooms found for the specified clinic ID');
            }
            const total_count = await this.repo.count({ where: { clinic_id } });
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Rooms retrieved successfully',
                data: {
                    records: rooms,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve rooms. Please try again later');
        }
    }
    async findOne(clinic_id, id) {
        try {
            const room = await this.repo.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!room) {
                throw new common_1.NotFoundException(`Room with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Room retrieved successfully',
                room,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve rooms. Please try again later');
        }
    }
    async update(clinic_id, id, updateRoomDto) {
        try {
            const room = await this.findOne(clinic_id, id);
            await room.room.update(updateRoomDto);
            return {
                message: 'Room updated successfully',
                room: room.room,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update room. Please try again later');
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repo.destroy({ where: { clinic_id, id } });
            return {
                message: 'Room deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete room. Please try again later');
        }
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(room_model_1.Room)),
    __metadata("design:paramtypes", [Object])
], RoomService);
//# sourceMappingURL=room.service.js.map