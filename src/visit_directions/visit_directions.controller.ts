import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitDirectionsService } from './visit_directions.service';
import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';

@Controller('visit-directions')
export class VisitDirectionsController {
  constructor(private readonly visitDirectionsService: VisitDirectionsService) {}

  @Post()
  create(@Body() createVisitDirectionDto: CreateVisitDirectionDto) {
    return this.visitDirectionsService.create(createVisitDirectionDto);
  }

  @Get()
  findAll() {
    return this.visitDirectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitDirectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDirectionDto: UpdateVisitDirectionDto) {
    return this.visitDirectionsService.update(+id, updateVisitDirectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitDirectionsService.remove(+id);
  }
}
