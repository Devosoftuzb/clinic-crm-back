import { PartialType } from '@nestjs/swagger';
import { CreateTbodyDto } from './create-tbody.dto';

export class UpdateTbodyDto extends PartialType(CreateTbodyDto) {}
