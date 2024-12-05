import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private repo: typeof Client) {}

  async create(clinic_id: string, createClientDto: CreateClientDto) {
    try {
      if (clinic_id !== createClientDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided client clinic ID',
        );
      }
      const client = await this.repo.create(createClientDto);
      return {
        message: 'Client created successfully',
        client,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create client. Please try again later',
        error
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const clients = await this.repo.findAll({ where: { clinic_id } });
      if (!clients || clients.length === 0) {
        throw new NotFoundException(
          'No clients found for the specified clinic ID',
        );
      }
      return {
        message: 'Clients retrieved successfully',
        clients,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clients. Please try again later',
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
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
        throw new NotFoundException(
          'No clients found for the specified clinic ID',
        );
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
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clients. Please try again later',
      );
    }
  }

  async findOne(clinic_id: string, id: string) {
    try {
      const client = await this.repo.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });

      if (!client) {
        throw new NotFoundException(
          `Client with id ${id} not found in clinic ${clinic_id}`,
        );
      }

      return {
        message: 'Client retrieved successfully',
        client,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clients. Please try again later',
      );
    }
  }

  async update(
    clinic_id: string,
    id: string,
    updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = await this.findOne(clinic_id, id);
      await client.client.update(updateClientDto);
      return {
        message: 'Client updated successfully',
        client: client.client,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update client. Please try again later',
      );
    }
  }

  async remove(clinic_id: string, id: string) {
    try {
      const client = await this.findOne(clinic_id, id);
      await client.client.destroy();
      return {
        message: 'Client deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete client. Please try again later',
      );
    }
  }
}
