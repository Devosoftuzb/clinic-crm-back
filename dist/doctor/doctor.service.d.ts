import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Employee } from 'src/employees/models/employee.model';
import { User } from 'src/user/models/user.model';
import { Doctor } from './models/doctor.model';
export declare class DoctorService {
    private repoDoctor;
    private repoEmployee;
    private repoUser;
    constructor(repoDoctor: typeof Doctor, repoEmployee: typeof Employee, repoUser: typeof User);
    private checkExistingUser;
    create(clinic_id: string, createDoctorDto: CreateDoctorDto): Promise<{
        message: string;
        doctor: Doctor;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        doctors: Doctor[];
    }>;
    findClinicDoctors(clinic_id: string): Promise<{
        message: string;
        doctors: Doctor[];
    }>;
    findExternalDoctors(clinic_id: string): Promise<{
        message: string;
        doctors: Doctor[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        doctor: Doctor;
    }>;
    update(clinic_id: string, id: string, updateDoctorDto: UpdateDoctorDto): Promise<{
        message: string;
        doctor: Doctor;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
