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
import { DirectionsService } from './directions.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Direction')
@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @ApiOperation({ summary: 'Create a new direction' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionsService.create(createDirectionDto);
  }

  @ApiOperation({ summary: 'View all directions' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  findAll() {
    return this.directionsService.findAll();
  }

  @ApiOperation({ summary: 'Paginate directions' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.directionsService.paginate(page);
  }

  @ApiOperation({ summary: 'View a direction by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a direction by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionsService.update(+id, updateDirectionDto);
  }

  @ApiOperation({ summary: 'Delete a direction by ID' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionsService.remove(+id);
  }
}
