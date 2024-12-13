import { CreateTheadDto } from './dto/create-thead.dto';
import { UpdateTheadDto } from './dto/update-thead.dto';
import { Thead } from './models/thead.model';
export declare class TheadService {
    private repo;
    constructor(repo: typeof Thead);
    create(clinic_id: string, createTheadDto: CreateTheadDto): Promise<{
        message: string;
        thead: Thead;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        theads: Thead[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: number): Promise<{
        message: string;
        thead: Thead;
    }>;
    update(clinic_id: string, id: number, updateTheadDto: UpdateTheadDto): Promise<{
        message: string;
        thead: Thead;
    }>;
    remove(clinic_id: string, id: number): Promise<{
        message: string;
    }>;
}
