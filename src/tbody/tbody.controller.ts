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
import { TbodyService } from './tbody.service';
import { CreateTbodyDto } from './dto/create-tbody.dto';
import { UpdateTbodyDto } from './dto/update-tbody.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Tbody')
@ApiBearerAuth('access-token')
@Roles(
  'manager',
  'administrator',
  'doctor',
  'accountant',
  'storekeeper',
  'lab_technician',
)
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('tbody')
export class TbodyController {
  constructor(private readonly tbodyService: TbodyService) {}

  @ApiOperation({ summary: 'Create a new tbody' })
  @Post()
  create(@Body() createTbodyDto: CreateTbodyDto) {
    return this.tbodyService.create(createTbodyDto);
  }

  @ApiOperation({ summary: 'View all tbodys' })
  @Get()
  findAll() {
    return this.tbodyService.findAll();
  }

  @ApiOperation({ summary: 'Paginate tbodys' })
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.tbodyService.paginate(page);
  }

  @ApiOperation({ summary: 'View a tbody by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tbodyService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a tbody by ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTbodyDto: UpdateTbodyDto) {
    return this.tbodyService.update(+id, updateTbodyDto);
  }

  @ApiOperation({ summary: 'Delete a tbody by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbodyService.remove(+id);
  }
}
