import { Thead } from './../../thead/models/thead.model';
import { Model } from 'sequelize-typescript';
interface TbodyAttr {
    thead_id: number;
    trow: any;
    result: string;
}
export declare class Tbody extends Model<Tbody, TbodyAttr> {
    id: number;
    thead_id: number;
    thead: Thead;
    trow: any;
    result: string;
}
export {};
