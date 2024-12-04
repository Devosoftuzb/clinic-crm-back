import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Doctor')
@ApiBearerAuth('access-token')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'Create a new doctor' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.doctorService.create(clinic_id, createDoctorDto);
  }

  @ApiOperation({ summary: 'View all doctors' })
  @Roles('owner', 'manager', 'administrator')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.doctorService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'View all clinic doctors' })
  @Roles('owner', 'manager', 'administrator')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('clinicDoctors/:clinic_id')
  findClinicDoctors(@Param('clinic_id') clinic_id: string) {
    return this.doctorService.findClinicDoctors(clinic_id);
  }

  @ApiOperation({ summary: 'View all external doctors' })
  @Roles('owner', 'manager', 'administrator')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('externalDoctors/:clinic_id')
  findExternalDoctors(@Param('clinic_id') clinic_id: string) {
    return this.doctorService.findExternalDoctors(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate doctors' })
  @Roles('owner', 'manager', 'administrator')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.doctorService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a doctor by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.doctorService.findOne(clinic_id, id);
  }

  @ApiOperation({ summary: 'Update a doctor by ID' })
  @UseGuards(JwtAuthGuard)
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(clinic_id, id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'Delete a doctor by ID' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.doctorService.remove(clinic_id, id);
  }
}
