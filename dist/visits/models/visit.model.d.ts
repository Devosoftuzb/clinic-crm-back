import { Model } from 'sequelize-typescript';
import { Client } from 'src/client/models/client.model';
import { Clinic } from 'src/clinic/models/clinic.model';
import { Doctor } from 'src/doctor/models/doctor.model';
import { Payment } from 'src/payment/models/payment.model';
import { Room } from 'src/room/models/room.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
interface VisitAttr {
    clinic_id: string;
    client_id: string;
    visit_date: string;
    stay_type: 'outpatient' | 'hospital';
    amount: string[];
    total_balance: number;
    discount: number;
    room_id: number;
    start_date: string;
    end_date: string;
    is_partner: boolean;
    is_payment: boolean;
    room_payment: boolean;
    doctor_id: string;
}
export declare class Visit extends Model<Visit, VisitAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    client_id: string;
    client: Client;
    visit_date: string;
    stay_type: 'outpatient' | 'hospital';
    amount: {
        total_amount: number;
    }[];
    total_balance: number;
    discount: number;
    room_id: string;
    room: Room;
    start_date: string;
    end_date: string;
    is_partner: boolean;
    is_payment: boolean;
    room_payment: boolean;
    doctor_id: string;
    doctor: Doctor;
    visitDirections: VisitDirection[];
    payment: Payment[];
}
export {};
