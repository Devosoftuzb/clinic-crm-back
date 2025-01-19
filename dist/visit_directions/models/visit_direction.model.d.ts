import { Model } from 'sequelize-typescript';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { Direction } from 'src/directions/models/direction.model';
import { Doctor } from 'src/doctor/models/doctor.model';
import { Payment } from 'src/payment/models/payment.model';
import { Visit } from 'src/visits/models/visit.model';
interface VisitDirectionAttr {
    visit_id: number;
    direction_id: number;
    service_id: number;
    doctor_id: number;
    price: number;
    line: number;
    status: boolean;
    is_payment: boolean;
    is_checked: boolean;
    diagnosis: string;
    retsept: string;
    id_doctor_id: string;
}
export declare class VisitDirection extends Model<VisitDirection, VisitDirectionAttr> {
    id: number;
    visit_id: number;
    visit: Visit;
    direction_id: number;
    direction: Direction;
    service_id: number;
    service: DirectionType;
    doctor_id: string;
    doctor: Doctor;
    price: number;
    line: number;
    status: boolean;
    is_payment: boolean;
    is_checked: boolean;
    diagnosis: string;
    retsept: string;
    id_doctor_id: string;
    id_doctor: Doctor;
    payment: Payment[];
}
export {};
