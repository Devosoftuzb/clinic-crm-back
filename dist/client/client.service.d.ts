import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './models/client.model';
export declare class ClientService {
    private repo;
    constructor(repo: typeof Client);
    create(clinic_id: string, createClientDto: CreateClientDto): Promise<{
        message: string;
        client: Client;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        clients: Client[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        client: Client;
    }>;
    update(clinic_id: string, id: string, updateClientDto: UpdateClientDto): Promise<{
        message: string;
        client: Client;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
