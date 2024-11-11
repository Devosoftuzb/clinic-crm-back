import { PartialType } from '@nestjs/swagger';
import { CreateVisitDirectionDto } from './create-visit_direction.dto';

export class UpdateVisitDirectionDto extends PartialType(CreateVisitDirectionDto) {}
