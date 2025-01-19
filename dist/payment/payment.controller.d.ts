import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        message: string;
        student: import("./models/payment.model").Payment;
    }>;
    findAll(clinic_id: string): Promise<import("./models/payment.model").Payment[]>;
    paginate(page: number, clinic_id: string): Promise<object>;
    filter(clinic_id: string, start_date: string, end_date: string, page: number): Promise<object>;
    findOne(id: string, clinic_id: string): Promise<import("./models/payment.model").Payment>;
    update(id: string, clinic_id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        message: string;
        payment: import("./models/payment.model").Payment;
    }>;
    remove(id: string, clinic_id: string): Promise<{
        message: string;
    }>;
}
