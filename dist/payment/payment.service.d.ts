import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './models/payment.model';
import { Client } from 'src/client/models/client.model';
import { Visit } from 'src/visits/models/visit.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
export declare class PaymentService {
    private repo;
    private repoClient;
    private repoVisit;
    private repoPaymentMethod;
    constructor(repo: typeof Payment, repoClient: typeof Client, repoVisit: typeof Visit, repoPaymentMethod: typeof PaymentMethod);
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
