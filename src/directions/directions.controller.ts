import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Direction')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('direction')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @ApiOperation({ summary: 'Create a new direction' })
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createDirectionDto: CreateDirectionDto,
  ) {
    return this.directionsService.create(clinic_id, createDirectionDto);
  }

  @ApiOperation({ summary: 'View all directions' })
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.directionsService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate directions' })
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.directionsService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a direction by ID' })
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.directionsService.findOne(clinic_id, +id);
  }

  @ApiOperation({ summary: 'Update a direction by ID' })
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionsService.update(clinic_id, +id, updateDirectionDto);
  }

  @ApiOperation({ summary: 'Delete a direction by ID' })
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.directionsService.remove(clinic_id, +id);
  }
}
