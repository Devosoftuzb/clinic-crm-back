import { TheadService } from './thead.service';
import { CreateTheadDto } from './dto/create-thead.dto';
import { UpdateTheadDto } from './dto/update-thead.dto';
export declare class TheadController {
    private readonly theadService;
    constructor(theadService: TheadService);
    create(clinic_id: string, createTheadDto: CreateTheadDto): Promise<{
        message: string;
        thead: import("./models/thead.model").Thead;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        theads: import("./models/thead.model").Thead[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        thead: import("./models/thead.model").Thead;
    }>;
    update(clinic_id: string, id: string, updateTheadDto: UpdateTheadDto): Promise<{
        message: string;
        thead: import("./models/thead.model").Thead;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
