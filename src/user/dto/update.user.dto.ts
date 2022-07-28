import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    id:bigint
}