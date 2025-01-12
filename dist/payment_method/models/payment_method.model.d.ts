import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
interface PaymentMethodAttr {
    clinic_id: string;
    name: string;
}
export declare class PaymentMethod extends Model<PaymentMethod, PaymentMethodAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    name: string;
}
export {};
