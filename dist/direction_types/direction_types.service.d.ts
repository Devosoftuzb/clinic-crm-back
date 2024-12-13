import { CreateDirectionTypeDto } from './dto/create-direction_type.dto';
import { UpdateDirectionTypeDto } from './dto/update-direction_type.dto';
import { DirectionType } from './models/direction_types.model';
export declare class DirectionTypesService {
    private repo;
    constructor(repo: typeof DirectionType);
    create(createDirectionTypeDto: CreateDirectionTypeDto): Promise<{
        message: string;
        direction_type: DirectionType;
    }>;
    findAll(): Promise<{
        message: string;
        direction_types: DirectionType[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: number): Promise<{
        message: string;
        direction_type: DirectionType;
    }>;
    update(id: number, updateDirectionTypeDto: UpdateDirectionTypeDto): Promise<{
        message: string;
        direction_type: DirectionType;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
