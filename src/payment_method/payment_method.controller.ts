import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Payment Method')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'Payment method create' })
  @Roles('owner', 'manager')
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @ApiOperation({ summary: 'Payment method view all by clinic ID' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.paymentMethodService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Payment method paginate' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':clinic_id/page')
  paginate(
    @Query('page') page: number,
    @Param('clinic_id') clinic_id: string
  ) {
    return this.paymentMethodService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'Payment method view by ID by clinic ID' })
   @Roles('owner', 'manager', 'administrator', 'doctor', 'accountant', 'storekeeper')
  @Get(':clinic_id/:id')
  findOne(@Param('id') id: string, @Param('clinic_id') clinic_id: string) {
    return this.paymentMethodService.findOne(+id, clinic_id);
  }

  @ApiOperation({ summary: 'Payment method update by ID by clinic ID' })
  @Roles('owner', 'manager')
  @Put(':clinic_id/:id')
  update(
    @Param('id') id: string,
    @Param('clinic_id') clinic_id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(+id, clinic_id, updatePaymentMethodDto);
  }

  @ApiOperation({ summary: 'Payment method remove by ID by clinic ID' })
  @Roles('owner', 'manager')
  @Delete(':clinic_id/:id')
  remove(
    @Param('id') id: string, 
    @Param('clinic_id') clinic_id: string
  ) {
    return this.paymentMethodService.remove(+id, clinic_id);
  }
}
