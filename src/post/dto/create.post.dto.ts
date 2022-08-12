import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    image!: string

    @IsOptional()
    @ApiProperty({nullable: true})
    description?: string

    @IsNotEmpty()
    @ApiProperty({nullable: false})
    userId!: bigint
}