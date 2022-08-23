import { PartialType } from '@nestjs/mapped-types';
import {CreateBlockedDto} from './create.blocked.dto';
import {IsNotEmpty, IsOptional} from 'class-validator'; 
import {ApiProperty} from '@nestjs/swagger';

export class UpdateBlockedDto extends PartialType(CreateBlockedDto){
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    id:bigint
}