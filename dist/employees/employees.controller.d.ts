import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(clinic_id: string, createEmployeeDto: CreateEmployeeDto): Promise<{
        message: string;
        employee: import("./models/employee.model").Employee;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        employees: import("./models/employee.model").Employee[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        employee: import("./models/employee.model").Employee;
    }>;
    update(clinic_id: string, id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        message: string;
        employee: import("./models/employee.model").Employee;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
