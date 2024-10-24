import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private repo: typeof Client) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.repo.create(createClientDto);
      return {
        message: 'Client created successfully',
        client,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const clients = await this.repo.findAll();
      return {
        message: 'Clients retrieved successfully',
        clients,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const clients = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
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
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.repo.findByPk(id, { include: { all: true } });
      if (!client) {
        throw new BadRequestException(`Client with id ${id} not found`);
      }
      return {
        message: 'Client retrieved successfully',
        client,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.findOne(id);
      await client.client.update(updateClientDto);
      return {
        message: 'Client updated successfully',
        client: client.client,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const client = await this.findOne(id);
      await client.client.destroy();
      return {
        message: 'Client deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
