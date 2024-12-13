export declare class CreateEmployeeDto {
    clinic_id: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    login: string;
    password: string;
    role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}
