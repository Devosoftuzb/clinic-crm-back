import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { VisitDirection } from 'src/visit_directions/models/visit_direction.model';
interface DirectionAttr {
    clinic_id: string;
    name: string;
    status: boolean;
}
export declare class Direction extends Model<Direction, DirectionAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    name: string;
    status: boolean;
    direction_types: DirectionType[];
    visit_directions: VisitDirection[];
}
export {};
