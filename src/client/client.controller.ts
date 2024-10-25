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
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientService.create(clinic_id, createClientDto);
  }

  @ApiOperation({ summary: 'View all clients' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.clientService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate clients' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.clientService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a client by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.clientService.findOne(clinic_id, id);
  }

  @ApiOperation({ summary: 'Update a client by ID' })
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(clinic_id, id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete a client by ID' })
  // @ApiBearerAuth('access-token')
  // @Roles('administrator')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.clientService.remove(clinic_id, id);
  }
}
