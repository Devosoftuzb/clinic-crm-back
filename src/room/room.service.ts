import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.model';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room) private repo: typeof Room) {}

  async create(clinic_id: string, createRoomDto: CreateRoomDto) {
    try {
      if (clinic_id !== createRoomDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided room clinic ID',
        );
      }
      const room = await this.repo.create(createRoomDto);
      return {
        message: 'Room created successfully',
        room,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create room. Please try again later', error
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const rooms = await this.repo.findAll({ where: { clinic_id } });
      if (!rooms || rooms.length === 0) {
        throw new NotFoundException(
          'No rooms found for the specified clinic ID',
        );
      }
      return {
        message: 'Rooms retrieved successfully',
        rooms,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve rooms. Please try again later', error
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
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
        throw new NotFoundException(
          'No rooms found for the specified clinic ID',
        );
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
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve rooms. Please try again later', error
      );
    }
  }

  async findOne(clinic_id: string, id: number) {
    try {
      const room = await this.repo.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });

      if (!room) {
        throw new NotFoundException(
          `Room with id ${id} not found in clinic ${clinic_id}`,
        );
      }

      return {
        message: 'Room retrieved successfully',
        room,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve rooms. Please try again later', error
      );
    }
  }

  async update(
    clinic_id: string,
    id: number,
    updateRoomDto: UpdateRoomDto,
  ) {
    try {
      const room = await this.findOne(clinic_id, id);
      await room.room.update(updateRoomDto);
      return {
        message: 'Room updated successfully',
        room: room.room,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update room. Please try again later', error
      );
    }
  }

  async remove(clinic_id: string, id: number) {
    try {
      await this.repo.destroy({ where: { clinic_id, id } });
      return {
        message: 'Room deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete room. Please try again later', error
      );
    }
  }
}
