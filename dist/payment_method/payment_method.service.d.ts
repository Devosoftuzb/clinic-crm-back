import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './models/payment_method.model';
export declare class PaymentMethodService {
    private repo;
    constructor(repo: typeof PaymentMethod);
    create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<{
        message: string;
        student: PaymentMethod;
    }>;
    findAll(clinic_id: string): Promise<PaymentMethod[]>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(id: number, clinic_id: string): Promise<PaymentMethod>;
    update(id: number, clinic_id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<{
        message: string;
        paymentMethod: PaymentMethod;
    }>;
    remove(id: number, clinic_id: string): Promise<{
        message: string;
    }>;
}
