import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Payment')
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard, JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Payment create' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Payment view all by clinic ID' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Get(':clinic_id')
  findAll(@Param('clinic_id') clinic_id: string) {
    return this.paymentService.findAll(clinic_id);
  }

  @ApiOperation({ summary: 'Payment paginate' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Get(':clinic_id/page')
  paginate(@Query('page') page: number, @Param('clinic_id') clinic_id: string) {
    return this.paymentService.paginate(clinic_id, page);
  }

  @ApiOperation({ summary: 'Payment paginate' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Get(':clinic_id/:start_date/:end_date/page')
  filter(
    @Param('clinic_id') clinic_id: string,
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string,
    @Query('page') page: number,
  ) {
    return this.paymentService.filter(clinic_id, start_date, end_date, page);
  }

  @ApiOperation({ summary: 'Payment view by ID by clinic ID' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Get(':clinic_id/:id')
  findOne(@Param('id') id: string, @Param('clinic_id') clinic_id: string) {
    return this.paymentService.findOne(+id, clinic_id);
  }

  @ApiOperation({ summary: 'Payment update by ID by clinic ID' })
  @Roles(
    'owner',
    'manager',
    'administrator',
    'doctor',
    'accountant',
    'storekeeper',
  )
  @Put(':clinic_id/:id')
  update(
    @Param('id') id: string,
    @Param('clinic_id') clinic_id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(+id, clinic_id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Payment remove by ID by clinic ID' })
  @Roles('owner', 'manager')
  @Delete(':clinic_id/:id')
  remove(@Param('id') id: string, @Param('clinic_id') clinic_id: string) {
    return this.paymentService.remove(+id, clinic_id);
  }
}
