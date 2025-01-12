import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Payment Method')
@Controller('payment-method')
@UseGuards(RolesGuard, JwtAuthGuard)
@ApiBearerAuth('access-token')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'Payment method create' })
  @Roles('owner', 'manager')
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @ApiOperation({ summary: 'Payment method view all by school ID' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':school_id')
  findAllBySchoolId(@Param('school_id') school_id: string) {
    return this.paymentMethodService.findAllBySchoolId(+school_id);
  }

  @ApiOperation({ summary: 'Payment method paginate' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':school_id/page')
  paginate(
    @Query('page') page: number,
    @Param('school_id') school_id: string
  ) {
    return this.paymentMethodService.paginate(+school_id, page);
  }

  @ApiOperation({ summary: 'Payment method view by ID by school ID' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':school_id/:id')
  findOne(@Param('id') id: string, @Param('school_id') school_id: string) {
    return this.paymentMethodService.findOne(+id, +school_id);
  }

  @ApiOperation({ summary: 'Payment method update by ID by school ID' })
  @Roles('owner', 'manager')
  @Put(':school_id/:id')
  update(
    @Param('id') id: string,
    @Param('school_id') school_id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(+id, +school_id, updatePaymentMethodDto);
  }

  @ApiOperation({ summary: 'Payment method remove by ID by school ID' })
  @Roles('owner', 'manager')
  @Delete(':school_id/:id')
  remove(
    @Param('id') id: string, 
    @Param('school_id') school_id: string
  ) {
    return this.paymentMethodService.remove(+id, +school_id);
  }
}
