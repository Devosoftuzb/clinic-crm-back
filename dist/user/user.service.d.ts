import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';
export declare class UserService {
    private repo;
    private repoEmployee;
    private repoDoctor;
    constructor(repo: typeof User, repoEmployee: typeof Employee, repoDoctor: typeof Doctor);
    onModuleInit(): Promise<{
        message: string;
        user: User;
    }>;
    private checkExistingUser;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: User;
    }>;
    findAll(): Promise<{
        message: string;
        users: User[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        user: User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: User;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
