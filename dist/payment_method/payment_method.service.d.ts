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
    findAllBySchoolId(clinic_id: number): Promise<PaymentMethod[]>;
    paginate(clinic_id: number, page: number): Promise<object>;
    findOne(id: number, clinic_id: number): Promise<PaymentMethod>;
    update(id: number, clinic_id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<{
        message: string;
        paymentMethod: PaymentMethod;
    }>;
    remove(id: number, clinic_id: number): Promise<{
        message: string;
    }>;
}
