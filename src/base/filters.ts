import { Status } from './enums';
import { ApiProperty } from '@nestjs/swagger';

export class Filters {
  @ApiProperty({ default: 0 })
  skip?: number = 0;

  @ApiProperty({ default: 10 })
  take?: number = 10;

  @ApiProperty({ default: '' })
  search?: string;

  @ApiProperty({ default: ''})
  sort?: string;

  @ApiProperty({ default: true })
  desc?: boolean = true;

  @ApiProperty({ default: Status.active, enum: Object.values(Status).filter((v) => !isNaN(Number(v))) })
  status?: number = Status.active;
}