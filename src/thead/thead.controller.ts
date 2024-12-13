import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TheadService } from './thead.service';
import { CreateTheadDto } from './dto/create-thead.dto';
import { UpdateTheadDto } from './dto/update-thead.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Thead')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper', 'lab_technician')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('thead')
export class TheadController {
  constructor(private readonly theadService: TheadService) {}

  @ApiOperation({ summary: 'Create a new thead' })
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createTheadDto: CreateTheadDto,
  ) {
    return this.theadService.create(clinic_id, createTheadDto);
  }

  @ApiOperation({ summary: 'View all theads' })
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.theadService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate theads' })
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.theadService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a thead by ID' })
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.theadService.findOne(clinic_id, +id);
  }

  @ApiOperation({ summary: 'Update a thead by ID' })
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateTheadDto: UpdateTheadDto,
  ) {
    return this.theadService.update(clinic_id, +id, updateTheadDto);
  }

  @ApiOperation({ summary: 'Delete a thead by ID' })
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.theadService.remove(clinic_id, +id);
  }
}
