import { CreateTbodyDto } from './dto/create-tbody.dto';
import { UpdateTbodyDto } from './dto/update-tbody.dto';
import { Tbody } from './models/tbody.model';
export declare class TbodyService {
    private repo;
    constructor(repo: typeof Tbody);
    create(createTbodyDto: CreateTbodyDto): Promise<{
        message: string;
        thead: Tbody;
    }>;
    findAll(): Promise<{
        message: string;
        theads: Tbody[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: number): Promise<{
        message: string;
        thead: Tbody;
    }>;
    update(id: number, updateTbodyDto: UpdateTbodyDto): Promise<{
        message: string;
        thead: Tbody;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
