import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
interface ClientAttr {
    clinic_id: string;
    passport: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    sex: 'male' | 'female';
    nonresident: boolean;
    address: string;
}
export declare class Client extends Model<Client, ClientAttr> {
    id: string;
    clinic_id: string;
    clinic: Clinic;
    passport: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    sex: 'male' | 'female';
    nonresident: boolean;
    address: string;
}
export {};
