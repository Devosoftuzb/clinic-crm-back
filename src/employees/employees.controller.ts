import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Employee')
@ApiBearerAuth('access-token')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Create a new employee' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeesService.create(clinic_id, createEmployeeDto);
  }

  @ApiOperation({ summary: 'View all employees' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.employeesService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate employees' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.employeesService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a employee by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.employeesService.findOne(clinic_id, id);
  }

  @ApiOperation({ summary: 'Update a employee by ID' })
  @UseGuards(JwtAuthGuard)
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(clinic_id, id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete a employee by ID' })
  @Roles('owner', 'manager')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.employeesService.remove(clinic_id, id);
  }
}
