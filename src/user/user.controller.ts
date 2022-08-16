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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Filters } from 'src/base/filters';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/auth.service';
import { AuthGuard, Claim } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {Result} from '../base/result';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
        async create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: TokenPayload) {
        const result = await this.userService.create(createUserDto, user);
        if (!result) return new NotFoundException("Record not found!")
        return new Result({ data: result, success: true });
    };

    @Post('/all')
    async findAll(
        @Body() 
        params: Filters, 
        @CurrentUser() user: TokenPayload
        ) {
        const result = await this.userService.findAll(params, user);
        if (!result) throw new NotFoundException("Not Found!");
        return new Result({ ...result, success: true });
    };

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(BigInt(id));
    };

    @Put()
    async update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: TokenPayload) {
        const result = await this.userService.update(updateUserDto, user);
        if (!result) return new NotFoundException("Record not found!")
        return new Result({ data: result, success: true });
    };

    @Delete(':id')
    async remove(@Param('id') id: string, @CurrentUser() user: TokenPayload) {
        try {
        const result = await this.userService.remove(+id, user);
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
