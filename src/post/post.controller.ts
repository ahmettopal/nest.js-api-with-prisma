import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    UseGuards, 
    NotFoundException, 
    Put, 
    BadRequestException 
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { Filters } from 'src/base/filters';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/auth.service';
import { AuthGuard, Claim } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {Result} from '../base/result';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('post')
export class PostController{
    constructor(private readonly postService: PostService) {}

    @Post()
        async create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: TokenPayload) {
        const result = await this.postService.create(createPostDto, user);
        if (!result) return new NotFoundException("Record not found!")
        return new Result({ data: result, success: true });
    };

    @Post('/all')
    async findAll(
        @Body() 
        params: Filters, 
        @CurrentUser() user: TokenPayload
        ) {
        const result = await this.postService.findAll(params, user);
        if (!result) throw new NotFoundException("Not Found!");
        return new Result({ ...result, success: true });
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.postService.findOne(BigInt(id));
    };

    @Put()
    async update(@Body() updatePostDto: UpdatePostDto, @CurrentUser() user: TokenPayload) {
        const result = await this.postService.update(updatePostDto, user);
        if (!result) return new NotFoundException("Record not found!")
        return new Result({ data: result, success: true });
    };

    @Delete(':id')
    async remove(@Param('id') id: string, @CurrentUser() user: TokenPayload) {
        try {
        const result = await this.postService.remove(+id, user);
        if (!result) return new NotFoundException("Record not found!");
        return new Result({ data: result, success: true });
        }catch (e) {
        return new BadRequestException(new Result({
            success: false,
            message: 'Delete Failed!',
            exception: e
        }))
        }
    };
}