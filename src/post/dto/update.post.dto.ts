import { PartialType } from '@nestjs/mapped-types';
import {CreatePostDto} from './create.post.dto';
import {IsNotEmpty, IsOptional} from 'class-validator'; 
import {ApiProperty} from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto){
    @IsNotEmpty()
    @ApiProperty({nullable: false})
    id:bigint
}