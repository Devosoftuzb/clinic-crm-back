import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(clinic_id: string, createDoctorDto: CreateDoctorDto): Promise<{
        message: string;
        doctor: import("./models/doctor.model").Doctor;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        doctors: import("./models/doctor.model").Doctor[];
    }>;
    findClinicDoctors(clinic_id: string): Promise<{
        message: string;
        doctors: import("./models/doctor.model").Doctor[];
    }>;
    findExternalDoctors(clinic_id: string): Promise<{
        message: string;
        doctors: import("./models/doctor.model").Doctor[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        doctor: import("./models/doctor.model").Doctor;
    }>;
    update(clinic_id: string, id: string, updateDoctorDto: UpdateDoctorDto): Promise<{
        message: string;
        doctor: import("./models/doctor.model").Doctor;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
