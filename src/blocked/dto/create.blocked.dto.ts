import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockedDto { 
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    blockedId!: bigint

    @IsNotEmpty()
    @ApiProperty({nullable: false})
    userId!: bigint
}