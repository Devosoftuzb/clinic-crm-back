import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
interface EmployeeAttr {
    clinic_id: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}
export declare class Employee extends Model<Employee, EmployeeAttr> {
    id: string;
    clinic_id: string;
    clinic: Clinic;
    full_name: string;
    birthday: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}
export {};
