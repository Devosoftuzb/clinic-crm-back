import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { VisitDirectionsService } from './visit_directions.service';
import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Visit Direction')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('visit-directions')
export class VisitDirectionsController {
  constructor(private readonly visitDirectionsService: VisitDirectionsService) {}

  @ApiOperation({ summary: 'Create a new direction type' })
  @Post()
  create(@Body() createVisitDirectionDto: CreateVisitDirectionDto) {
    return this.visitDirectionsService.create(createVisitDirectionDto);
  }

  @ApiOperation({ summary: 'View all direction types' })
  @Get()
  findAll() {
    return this.visitDirectionsService.findAll();
  }

  @ApiOperation({ summary: 'Paginate direction types' })
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.visitDirectionsService.paginate(page);
  }

  @ApiOperation({ summary: 'View a direction type by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitDirectionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a direction type by ID' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVisitDirectionDto: UpdateVisitDirectionDto,
  ) {
    return this.visitDirectionsService.update(+id, updateVisitDirectionDto);
  }

  @ApiOperation({ summary: 'Delete a direction type by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitDirectionsService.remove(+id);
  }
}
