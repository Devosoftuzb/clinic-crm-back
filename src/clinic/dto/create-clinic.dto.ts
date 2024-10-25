import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClinicDto {
    @ApiProperty({example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27', description: 'Clinic owner ID'})
    @IsString()
    @IsNotEmpty()
    owner_id: string;
    
    @ApiProperty({example: 'Devosoft', description: 'Clinic name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: '4 mkr Yoshlar markazi', description: 'Clinic address'})
    @IsString()
    @IsNotEmpty()
    address: string;

}
