import { DoctorDirectionService } from './doctor_direction.service';
import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';
export declare class DoctorDirectionController {
    private readonly doctorDirectionService;
    constructor(doctorDirectionService: DoctorDirectionService);
    create(createDoctorDirectionDto: CreateDoctorDirectionDto): Promise<{
        message: string;
        doctor_direction: import("./models/doctor_direction.model").DoctorDirection;
    }>;
    findAll(): Promise<{
        message: string;
        doctor_directions: import("./models/doctor_direction.model").DoctorDirection[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        doctor_direction: import("./models/doctor_direction.model").DoctorDirection;
    }>;
    update(id: string, updateDoctorDirectionDto: UpdateDoctorDirectionDto): Promise<{
        message: string;
        doctor_direction: import("./models/doctor_direction.model").DoctorDirection;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
