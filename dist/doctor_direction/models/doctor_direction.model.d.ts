import { Model } from 'sequelize-typescript';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { Doctor } from 'src/doctor/models/doctor.model';
interface DoctorDirectionAttr {
    direction_id: number;
    doctor_id: string;
    price: number;
}
export declare class DoctorDirection extends Model<DoctorDirection, DoctorDirectionAttr> {
    id: number;
    direction_id: number;
    direction: DirectionType;
    doctor_id: string;
    doctor: Doctor;
    price: number;
}
export {};
