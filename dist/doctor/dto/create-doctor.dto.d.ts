export declare class CreateDoctorDto {
    clinic_id: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    experience: number;
    login: string;
    password: string;
    role: 'doctor' | 'lab_technician' | 'external_doctor';
}
