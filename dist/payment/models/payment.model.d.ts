import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { Room } from 'src/room/models/room.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
import { Visit } from 'src/visits/models/visit.model';
interface PaymentAttr {
    clinic_id: string;
    visit_id: number;
    room_id: number;
    direction_id: number;
    payment_method_id: number;
    price: number;
}
export declare class Payment extends Model<Payment, PaymentAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    visit_id: number;
    visit: Visit;
    room_id: number;
    room: Room;
    direction_id: number;
    direction: VisitDirection;
    payment_method_id: number;
    payment_method: PaymentMethod;
    price: number;
}
export {};
