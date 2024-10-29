import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorDirectionService } from './doctor_direction.service';
import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';

@Controller('doctor-direction')
export class DoctorDirectionController {
  constructor(private readonly doctorDirectionService: DoctorDirectionService) {}

  @Post()
  create(@Body() createDoctorDirectionDto: CreateDoctorDirectionDto) {
    return this.doctorDirectionService.create(createDoctorDirectionDto);
  }

  @Get()
  findAll() {
    return this.doctorDirectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorDirectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDirectionDto: UpdateDoctorDirectionDto) {
    return this.doctorDirectionService.update(+id, updateDoctorDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorDirectionService.remove(+id);
  }
}
