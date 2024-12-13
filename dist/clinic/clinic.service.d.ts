import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from './models/clinic.model';
export declare class ClinicService {
    private repo;
    constructor(repo: typeof Clinic);
    create(createClinicDto: CreateClinicDto): Promise<{
        message: string;
        clinic: Clinic;
    }>;
    findAll(): Promise<{
        message: string;
        clinics: Clinic[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        clinic: Clinic;
    }>;
    update(id: string, updateClinicDto: UpdateClinicDto): Promise<{
        message: string;
        clinic: Clinic;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
