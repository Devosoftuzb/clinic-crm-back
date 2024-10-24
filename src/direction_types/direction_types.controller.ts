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
} from '@nestjs/common';
import { DirectionTypesService } from './direction_types.service';
import { CreateDirectionTypeDto } from './dto/create-direction_type.dto';
import { UpdateDirectionTypeDto } from './dto/update-direction_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Direction Type')
@Controller('direction-type')
export class DirectionTypesController {
  constructor(private readonly directionTypesService: DirectionTypesService) {}

  @ApiOperation({ summary: 'Create a new direction type' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  create(@Body() createDirectionTypeDto: CreateDirectionTypeDto) {
    return this.directionTypesService.create(createDirectionTypeDto);
  }

  @ApiOperation({ summary: 'View all direction types' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  findAll() {
    return this.directionTypesService.findAll();
  }

  @ApiOperation({ summary: 'Paginate direction types' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.directionTypesService.paginate(page);
  }

  @ApiOperation({ summary: 'View a direction type by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directionTypesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a direction type by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectionTypeDto: UpdateDirectionTypeDto,
  ) {
    return this.directionTypesService.update(+id, updateDirectionTypeDto);
  }

  @ApiOperation({ summary: 'Delete a direction type by ID' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionTypesService.remove(+id);
  }
}
