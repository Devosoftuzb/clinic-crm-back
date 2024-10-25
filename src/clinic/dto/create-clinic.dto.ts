import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClinicDto {
    @ApiProperty({example: 'Devosoft', description: 'Clinic name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: '4 mkr Yoshlar markazi', description: 'Clinic address'})
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({example: '', description: 'Clinic owner ID'})
    @IsString()
    @IsNotEmpty()
    owner_id: string;
}
