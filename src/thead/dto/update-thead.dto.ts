import { PartialType } from '@nestjs/swagger';
import { CreateTheadDto } from './create-thead.dto';

export class UpdateTheadDto extends PartialType(CreateTheadDto) {}
