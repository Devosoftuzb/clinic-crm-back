import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './models/payment.model';
export declare class PaymentService {
    private repo;
    constructor(repo: typeof Payment);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        message: string;
        student: Payment;
    }>;
    findAll(clinic_id: string): Promise<Payment[]>;
    paginate(clinic_id: string, page: number): Promise<object>;
    filter(clinic_id: string, start_date: string, end_date: string, page: number): Promise<object>;
    findOne(id: number, clinic_id: string): Promise<Payment>;
    update(id: number, clinic_id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        message: string;
        payment: Payment;
    }>;
    remove(id: number, clinic_id: string): Promise<{
        message: string;
    }>;
}
