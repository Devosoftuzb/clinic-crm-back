import { TbodyService } from './tbody.service';
import { CreateTbodyDto } from './dto/create-tbody.dto';
import { UpdateTbodyDto } from './dto/update-tbody.dto';
export declare class TbodyController {
    private readonly tbodyService;
    constructor(tbodyService: TbodyService);
    create(createTbodyDto: CreateTbodyDto): Promise<{
        message: string;
        thead: import("./models/tbody.model").Tbody;
    }>;
    findAll(): Promise<{
        message: string;
        theads: import("./models/tbody.model").Tbody[];
    }>;
    paginate(page: number): Promise<object>;
    findOne(id: string): Promise<{
        message: string;
        thead: import("./models/tbody.model").Tbody;
    }>;
    update(id: string, updateTbodyDto: UpdateTbodyDto): Promise<{
        message: string;
        thead: import("./models/tbody.model").Tbody;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
