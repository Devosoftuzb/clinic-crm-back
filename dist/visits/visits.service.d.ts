import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './models/visit.model';
import { Room } from 'src/room/models/room.model';
import { Client } from 'src/client/models/client.model';
export declare class VisitsService {
    private repo;
    private repoRoom;
    private repoClient;
    constructor(repo: typeof Visit, repoRoom: typeof Room, repoClient: typeof Client);
    create(clinic_id: string, createVisitDto: CreateVisitDto): Promise<{
        message: string;
        visit: Visit;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        visits: Visit[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    filter(clinic_id: string, start_date: string, end_date: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: number): Promise<{
        message: string;
        visit: Visit;
    }>;
    update(clinic_id: string, id: number, updateVisitDto: UpdateVisitDto): Promise<{
        message: string;
        visit: Visit;
    }>;
    remove(clinic_id: string, id: number): Promise<{
        message: string;
    }>;
}
