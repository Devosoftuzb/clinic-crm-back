import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';
import { VisitDirection } from './models/visit_direction.model';
import { Visit } from 'src/visits/models/visit.model';
export declare class VisitDirectionsService {
    private repo;
    private repoVisit;
    constructor(repo: typeof VisitDirection, repoVisit: typeof Visit);
    create(createVisitDirectionDto: CreateVisitDirectionDto): Promise<{
        message: string;
        visit_direction: any[];
    }>;
    findAll(): Promise<{
        message: string;
        visit_directions: VisitDirection[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: number): Promise<{
        message: string;
        visit_direction: VisitDirection;
    }>;
    update(id: number, updateVisitDirectionDto: UpdateVisitDirectionDto): Promise<{
        message: string;
        visit_direction: VisitDirection;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
