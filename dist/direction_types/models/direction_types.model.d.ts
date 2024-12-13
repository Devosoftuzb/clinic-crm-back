import { Model } from 'sequelize-typescript';
import { Direction } from 'src/directions/models/direction.model';
import { DoctorDirection } from 'src/doctor_direction/models/doctor_direction.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
interface DirectionTypeAttr {
    direction_id: number;
    name: string;
}
export declare class DirectionType extends Model<DirectionType, DirectionTypeAttr> {
    id: number;
    direction_id: number;
    direction: Direction;
    name: string;
    doctorDirection: DoctorDirection[];
    visit_directions: VisitDirection[];
}
export {};
