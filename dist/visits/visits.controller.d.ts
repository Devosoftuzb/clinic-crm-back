import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(clinic_id: string, createVisitDto: CreateVisitDto): Promise<{
        message: string;
        visit: import("./models/visit.model").Visit;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        visits: import("./models/visit.model").Visit[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    filter(clinic_id: string, start_date: string, end_date: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        visit: import("./models/visit.model").Visit;
    }>;
    update(clinic_id: string, id: string, updateVisitDto: UpdateVisitDto): Promise<{
        message: string;
        visit: import("./models/visit.model").Visit;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
