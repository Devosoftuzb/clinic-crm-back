import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { Direction } from './models/direction.model';
export declare class DirectionsService {
    private repo;
    constructor(repo: typeof Direction);
    create(clinic_id: string, createDirectionDto: CreateDirectionDto): Promise<{
        message: string;
        direction: Direction;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        directions: Direction[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: number): Promise<{
        message: string;
        direction: Direction;
    }>;
    update(clinic_id: string, id: number, updateDirectionDto: UpdateDirectionDto): Promise<{
        message: string;
        direction: Direction;
    }>;
    remove(clinic_id: string, id: number): Promise<{
        message: string;
    }>;
}
