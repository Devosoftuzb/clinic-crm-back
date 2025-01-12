import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<{
        message: string;
        student: import("./models/payment_method.model").PaymentMethod;
    }>;
    findAllBySchoolId(school_id: string): Promise<import("./models/payment_method.model").PaymentMethod[]>;
    paginate(page: number, school_id: string): Promise<object>;
    findOne(id: string, school_id: string): Promise<import("./models/payment_method.model").PaymentMethod>;
    update(id: string, school_id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<{
        message: string;
        paymentMethod: import("./models/payment_method.model").PaymentMethod;
    }>;
    remove(id: string, school_id: string): Promise<{
        message: string;
    }>;
}
