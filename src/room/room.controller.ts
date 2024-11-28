import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Room')
@ApiBearerAuth('access-token')
@Roles('manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Create a new room' })
  @Post(':clinic_id')
  create(
    @Param('clinic_id') clinic_id: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create(clinic_id, createRoomDto);
  }

  @ApiOperation({ summary: 'View all rooms' })
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.roomService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Paginate rooms' })
  @Get(':clinic_id/page')
  paginate(@Param('clinic_id') clinic_id: string, @Query('page') page: number) {
    return this.roomService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'View a room by ID' })
  @Get(':clinic_id/:id')
  findOne(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.roomService.findOne(clinic_id, +id);
  }

  @ApiOperation({ summary: 'Update a room by ID' })
  @Put(':clinic_id/:id')
  update(
    @Param('clinic_id') clinic_id: string,
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(clinic_id, +id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Delete a room by ID' })
  @Delete(':clinic_id/:id')
  remove(@Param('clinic_id') clinic_id: string, @Param('id') id: string) {
    return this.roomService.remove(clinic_id, +id);
  }
}
