import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Clinic')
@ApiBearerAuth('access-token')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @ApiOperation({ summary: 'Create a new clinic' })
  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @ApiOperation({ summary: 'View all clinics' })
  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @ApiOperation({ summary: 'Paginate clinics' })
  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.clinicService.paginate(page);
  }

  @ApiOperation({ summary: 'View a clinic by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a clinic by ID' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUpdateDto: UpdateClinicDto) {
    return this.clinicService.update(id, updateUpdateDto);
  }

  @ApiOperation({ summary: 'Delete a clinic by ID' })
  @Roles('superadmin', 'admin')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicService.remove(id);
  }
}
