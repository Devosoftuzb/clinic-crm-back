import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
interface RoomAttr {
    name: string;
    status: boolean;
}
export declare class Room extends Model<Room, RoomAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    name: string;
    status: boolean;
}
export {};
