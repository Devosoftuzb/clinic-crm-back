import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { DoctorDirection } from 'src/doctor_direction/models/doctor_direction.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
interface DoctorAttr {
    clinic_id: string;
    full_name: string;
    birthday: string;
    phone_number: string;
    experience: number;
    room: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'doctor' | 'lab_technician' | 'external_doctor';
    status: boolean;
}
export declare class Doctor extends Model<Doctor, DoctorAttr> {
    id: string;
    clinic_id: string;
    clinic: Clinic;
    full_name: string;
    birthday: string;
    phone_number: string;
    experience: number;
    room: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    role: 'doctor' | 'lab_technician' | 'external_doctor';
    status: boolean;
    doctorDirection: DoctorDirection[];
    visit_directions: VisitDirection[];
}
export {};
