import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
interface UserAttr {
    full_name: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'superadmin' | 'admin' | 'owner';
}
export declare class User extends Model<User, UserAttr> {
    id: string;
    full_name: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'superadmin' | 'admin' | 'owner';
    clinics: Clinic[];
}
export {};
