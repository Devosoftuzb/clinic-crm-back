import { Model } from 'sequelize-typescript';
import { Client } from 'src/client/models/client.model';
import { Direction } from 'src/directions/models/direction.model';
import { Doctor } from 'src/doctor/models/doctor.model';
import { Employee } from 'src/employees/models/employee.model';
import { Room } from 'src/room/models/room.model';
import { User } from 'src/user/models/user.model';
import { Visit } from 'src/visits/models/visit.model';
interface ClinicAttr {
    name: string;
    address: string;
    owner_id: string;
}
export declare class Clinic extends Model<Clinic, ClinicAttr> {
    id: string;
    name: string;
    address: string;
    owner_id: string;
    owner: User;
    clients: Client[];
    directions: Direction[];
    employees: Employee[];
    doctors: Doctor[];
    visits: Visit[];
    rooms: Room[];
}
export {};
