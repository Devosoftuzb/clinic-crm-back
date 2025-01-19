import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { Payment } from 'src/payment/models/payment.model';
interface RoomAttr {
    clinic_id: string;
    name: string;
    number_seats: number;
    price: number;
    status: boolean;
}
export declare class Room extends Model<Room, RoomAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    name: string;
    number_seats: number;
    price: number;
    status: boolean;
    payment: Payment[];
}
export {};
