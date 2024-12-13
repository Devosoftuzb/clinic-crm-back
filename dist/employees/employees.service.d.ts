import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './models/employee.model';
import { User } from 'src/user/models/user.model';
import { Doctor } from 'src/doctor/models/doctor.model';
export declare class EmployeesService {
    private repoEmployee;
    private repoUser;
    private repoDoctor;
    constructor(repoEmployee: typeof Employee, repoUser: typeof User, repoDoctor: typeof Doctor);
    private checkExistingUser;
    create(clinic_id: string, createEmployeeDto: CreateEmployeeDto): Promise<{
        message: string;
        employee: Employee;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        employees: Employee[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        employee: Employee;
    }>;
    update(clinic_id: string, id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        message: string;
        employee: Employee;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
