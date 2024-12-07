import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Visit')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @ApiOperation({ summary: 'Create a new visit' })
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createVisitDto: CreateVisitDto,
  ) {
    return this.visitsService.create(clinic_id, createVisitDto);
  }

  @ApiOperation({ summary: 'View all visits' })
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.visitsService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate visits' })
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.visitsService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'Paginate visits' })
  @Get(':clinic_id/page')
  paginateOneDayVisit(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.visitsService.paginateOneDayVisit(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a visit by ID' })
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.visitsService.findOne(clinic_id, +id);
  }

  @ApiOperation({ summary: 'Update a visit by ID' })
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitsService.update(clinic_id, +id, updateVisitDto);
  }

  @ApiOperation({ summary: 'Delete a visit by ID' })
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.visitsService.remove(clinic_id, +id);
  }
}
