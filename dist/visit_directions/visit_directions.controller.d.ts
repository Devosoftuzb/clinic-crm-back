import { VisitDirectionsService } from './visit_directions.service';
import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';
export declare class VisitDirectionsController {
    private readonly visitDirectionsService;
    constructor(visitDirectionsService: VisitDirectionsService);
    create(createVisitDirectionDto: CreateVisitDirectionDto): Promise<{
        message: string;
        visit_direction: any[];
    }>;
    findAll(): Promise<{
        message: string;
        visit_directions: import("./models/visit_direction.model").VisitDirection[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        visit_direction: import("./models/visit_direction.model").VisitDirection;
    }>;
    update(id: string, updateVisitDirectionDto: UpdateVisitDirectionDto): Promise<{
        message: string;
        visit_direction: import("./models/visit_direction.model").VisitDirection;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
