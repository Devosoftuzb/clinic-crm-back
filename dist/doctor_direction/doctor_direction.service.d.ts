import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';
import { DoctorDirection } from './models/doctor_direction.model';
export declare class DoctorDirectionService {
    private repo;
    constructor(repo: typeof DoctorDirection);
    create(createDoctorDirectionDto: CreateDoctorDirectionDto): Promise<{
        message: string;
        doctor_direction: DoctorDirection;
    }>;
    findAll(): Promise<{
        message: string;
        doctor_directions: DoctorDirection[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: number): Promise<{
        message: string;
        doctor_direction: DoctorDirection;
    }>;
    update(id: number, updateDoctorDirectionDto: UpdateDoctorDirectionDto): Promise<{
        message: string;
        doctor_direction: DoctorDirection;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
