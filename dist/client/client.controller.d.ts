import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(clinic_id: string, createClientDto: CreateClientDto): Promise<{
        message: string;
        client: import("./models/client.model").Client;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        clients: import("./models/client.model").Client[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        client: import("./models/client.model").Client;
    }>;
    update(clinic_id: string, id: string, updateClientDto: UpdateClientDto): Promise<{
        message: string;
        client: import("./models/client.model").Client;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
