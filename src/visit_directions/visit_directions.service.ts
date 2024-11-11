import { Injectable } from '@nestjs/common';
import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';

@Injectable()
export class VisitDirectionsService {
  create(createVisitDirectionDto: CreateVisitDirectionDto) {
    return 'This action adds a new visitDirection';
  }

  findAll() {
    return `This action returns all visitDirections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitDirection`;
  }

  update(id: number, updateVisitDirectionDto: UpdateVisitDirectionDto) {
    return `This action updates a #${id} visitDirection`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitDirection`;
  }
}
