import { Model } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/models/clinic.model';
import { DirectionType } from 'src/direction_types/models/direction_types.model';
import { Direction } from 'src/directions/models/direction.model';
import { Tbody } from 'src/tbody/models/tbody.model';
interface TheadAttr {
    clinic_id: string;
    direction_id: number;
    service_id: number;
    thead: any;
}
export declare class Thead extends Model<Thead, TheadAttr> {
    id: number;
    clinic_id: string;
    clinic: Clinic;
    direction_id: number;
    direction: Direction;
    service_id: number;
    service: DirectionType;
    thead: any;
    tbody: Tbody[];
}
export {};
