import { DirectionTypesService } from './direction_types.service';
import { CreateDirectionTypeDto } from './dto/create-direction_type.dto';
import { UpdateDirectionTypeDto } from './dto/update-direction_type.dto';
export declare class DirectionTypesController {
    private readonly directionTypesService;
    constructor(directionTypesService: DirectionTypesService);
    create(createDirectionTypeDto: CreateDirectionTypeDto): Promise<{
        message: string;
        direction_type: import("./models/direction_types.model").DirectionType;
    }>;
    findAll(): Promise<{
        message: string;
        direction_types: import("./models/direction_types.model").DirectionType[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        direction_type: import("./models/direction_types.model").DirectionType;
    }>;
    update(id: string, updateDirectionTypeDto: UpdateDirectionTypeDto): Promise<{
        message: string;
        direction_type: import("./models/direction_types.model").DirectionType;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
