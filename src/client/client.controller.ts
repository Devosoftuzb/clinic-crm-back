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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create a new client' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'View all clients' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Paginate clients' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('page')
  paginate(@Query('page') page: number) {
    return this.clientService.paginate(page);
  }

  @ApiOperation({ summary: 'View a client by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a client by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete a client by ID' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
