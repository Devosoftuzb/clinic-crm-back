import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { DoctorDirectionService } from './doctor_direction.service';
import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Direction Type')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('doctor-direction')
export class DoctorDirectionController {
  constructor(private readonly doctorDirectionService: DoctorDirectionService) {}

  @ApiOperation({ summary: 'Create a new doctor direction' })
  @Post()
  create(@Body() createDoctorDirectionDto: CreateDoctorDirectionDto) {
    return this.doctorDirectionService.create(createDoctorDirectionDto);
  }

  @ApiOperation({ summary: 'View all doctor directions' })
  @Get()
  findAll() {
    return this.doctorDirectionService.findAll();
  }

  @ApiOperation({ summary: 'Paginate doctor directions' })
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.doctorDirectionService.paginate(page);
  }

  @ApiOperation({ summary: 'View a doctor direction by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorDirectionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a doctor direction by ID' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorDirectionDto: UpdateDoctorDirectionDto,
  ) {
    return this.doctorDirectionService.update(+id, updateDoctorDirectionDto);
  }

  @ApiOperation({ summary: 'Delete a doctor direction by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorDirectionService.remove(+id);
  }
}
