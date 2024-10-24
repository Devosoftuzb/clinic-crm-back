import { PartialType } from '@nestjs/swagger';
import { CreateDirectionTypeDto } from './create-direction_type.dto';

export class UpdateDirectionTypeDto extends PartialType(CreateDirectionTypeDto) {}
