import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './models/room.model';
export declare class RoomService {
    private repo;
    constructor(repo: typeof Room);
    create(clinic_id: string, createRoomDto: CreateRoomDto): Promise<{
        message: string;
        room: Room;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        rooms: Room[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: number): Promise<{
        message: string;
        room: Room;
    }>;
    update(clinic_id: string, id: number, updateRoomDto: UpdateRoomDto): Promise<{
        message: string;
        room: Room;
    }>;
    remove(clinic_id: string, id: number): Promise<{
        message: string;
    }>;
}
