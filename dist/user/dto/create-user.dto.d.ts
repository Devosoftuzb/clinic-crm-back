export declare class CreateUserDto {
    full_name: string;
    phone_number: string;
    login: string;
    password: string;
    role: 'superadmin' | 'admin' | 'owner';
}
