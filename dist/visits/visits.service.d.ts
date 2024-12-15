import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './models/visit.model';
export declare class VisitsService {
    private repo;
    constructor(repo: typeof Visit);
    create(clinic_id: string, createVisitDto: CreateVisitDto): Promise<{
        message: string;
        visitUpdate: [affectedCount: number];
        visit?: undefined;
    } | {
        message: string;
        visit: Visit;
        visitUpdate?: undefined;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        visits: Visit[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    paginateOneDayVisit(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: number): Promise<{
        message: string;
        visit: Visit;
    }>;
    update(clinic_id: string, id: number, updateVisitDto: UpdateVisitDto): Promise<{
        message: string;
        visit: Visit;
    }>;
    remove(clinic_id: string, id: number): Promise<{
        message: string;
    }>;
}
