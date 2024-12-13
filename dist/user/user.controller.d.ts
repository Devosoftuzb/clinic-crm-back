import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: import("./models/user.model").User;
    }>;
    findAll(): Promise<{
        message: string;
        users: import("./models/user.model").User[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        user: import("./models/user.model").User;
    }>;
    update(id: string, updateUpdateDto: UpdateUserDto): Promise<{
        message: string;
        user: import("./models/user.model").User;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
