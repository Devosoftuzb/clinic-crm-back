import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
export declare class ClinicController {
    private readonly clinicService;
    constructor(clinicService: ClinicService);
    create(createClinicDto: CreateClinicDto): Promise<{
        message: string;
        clinic: import("./models/clinic.model").Clinic;
    }>;
    findAll(): Promise<{
        message: string;
        clinics: import("./models/clinic.model").Clinic[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        clinic: import("./models/clinic.model").Clinic;
    }>;
    update(id: string, updateUpdateDto: UpdateClinicDto): Promise<{
        message: string;
        clinic: import("./models/clinic.model").Clinic;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
