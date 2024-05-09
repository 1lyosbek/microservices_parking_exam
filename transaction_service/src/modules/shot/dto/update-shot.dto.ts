import { PartialType } from '@nestjs/mapped-types';
import { CreateShotDto } from './create-shot.dto';

export class UpdateShotDto extends PartialType(CreateShotDto) {
  id: number;
}
