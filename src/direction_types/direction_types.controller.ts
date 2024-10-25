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
import { DirectionTypesService } from './direction_types.service';
import { CreateDirectionTypeDto } from './dto/create-direction_type.dto';
import { UpdateDirectionTypeDto } from './dto/update-direction_type.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Direction Type')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('direction-type')
export class DirectionTypesController {
  constructor(private readonly directionTypesService: DirectionTypesService) {}

  @ApiOperation({ summary: 'Create a new direction type' })
  @Post()
  create(@Body() createDirectionTypeDto: CreateDirectionTypeDto) {
    return this.directionTypesService.create(createDirectionTypeDto);
  }

  @ApiOperation({ summary: 'View all direction types' })
  @Get()
  findAll() {
    return this.directionTypesService.findAll();
  }

  @ApiOperation({ summary: 'Paginate direction types' })
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.directionTypesService.paginate(page);
  }

  @ApiOperation({ summary: 'View a direction type by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directionTypesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a direction type by ID' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectionTypeDto: UpdateDirectionTypeDto,
  ) {
    return this.directionTypesService.update(+id, updateDirectionTypeDto);
  }

  @ApiOperation({ summary: 'Delete a direction type by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directionTypesService.remove(+id);
  }
}
