import { Injectable } from '@nestjs/common';
import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';

@Injectable()
export class DoctorDirectionService {
  create(createDoctorDirectionDto: CreateDoctorDirectionDto) {
    return 'This action adds a new doctorDirection';
  }

  findAll() {
    return `This action returns all doctorDirection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorDirection`;
  }

  update(id: number, updateDoctorDirectionDto: UpdateDoctorDirectionDto) {
    return `This action updates a #${id} doctorDirection`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorDirection`;
  }
}
