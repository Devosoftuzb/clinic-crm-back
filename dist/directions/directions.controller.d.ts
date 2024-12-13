import { DirectionsService } from './directions.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
export declare class DirectionsController {
    private readonly directionsService;
    constructor(directionsService: DirectionsService);
    create(clinic_id: string, createDirectionDto: CreateDirectionDto): Promise<{
        message: string;
        direction: import("./models/direction.model").Direction;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        directions: import("./models/direction.model").Direction[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        direction: import("./models/direction.model").Direction;
    }>;
    update(clinic_id: string, id: string, updateDirectionDto: UpdateDirectionDto): Promise<{
        message: string;
        direction: import("./models/direction.model").Direction;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
