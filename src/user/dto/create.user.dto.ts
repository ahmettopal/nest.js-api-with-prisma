import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    name!: string

    @IsNotEmpty()
    @ApiProperty({nullable: false})
    username!: string

    @IsOptional()
    @ApiProperty({nullable: false})
    biyo!: string
}