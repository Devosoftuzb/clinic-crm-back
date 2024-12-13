import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create(clinic_id: string, createRoomDto: CreateRoomDto): Promise<{
        message: string;
        room: import("./models/room.model").Room;
    }>;
    findAll(clinic_id: string): Promise<{
        message: string;
        rooms: import("./models/room.model").Room[];
    }>;
    paginate(clinic_id: string, page: number): Promise<object>;
    findOne(clinic_id: string, id: string): Promise<{
        message: string;
        room: import("./models/room.model").Room;
    }>;
    update(clinic_id: string, id: string, updateRoomDto: UpdateRoomDto): Promise<{
        message: string;
        room: import("./models/room.model").Room;
    }>;
    remove(clinic_id: string, id: string): Promise<{
        message: string;
    }>;
}
