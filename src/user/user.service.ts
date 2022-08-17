import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'src/auth/auth.service';
import { Status } from 'src/base/enums';
import { Filters } from 'src/base/filters';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createUserDto: CreateUserDto, payload:TokenPayload){
        return await this.prismaService.user.create({
            data: {
                ...createUserDto,
                createBy: BigInt(payload.id), // will come from token,
                status: Status.active, //will come from enums,
            }
        })
    };

    async findAll(filters: Filters, payload: TokenPayload) {
        return {
          data: await this.prismaService.user.findMany({
            where: {
              name: {
                contains: filters.search,
              },
              status: {
                equals: filters.status ? filters.status : Status.active,
              },
            },
            skip: (filters.skip ?? 0) * (filters.take ?? 10) ?? 0,
            take: filters.take ?? 10,
            orderBy: {
              [filters.sort ? filters.sort : 'id']: filters.desc ? 'desc' : 'asc',
            },
          }),
          count: await this.prismaService.user.count({
            where: {
              name: {
                contains: filters.search,
              },
              status: {
                equals: filters.status ? filters.status : Status.active,
              },
            },
          })
        };
    };

    findOne(id: bigint | number) {
        return this.prismaService.user.findUnique({
          where: {
            id,
          },
        });
    };

    update(updateUserDto: UpdateUserDto, payload: TokenPayload) {
        return this.prismaService.user.update({
          data: {
            ...updateUserDto,
            updateBy: BigInt(payload.id), // will come from token,
          },
          where: {
            id: updateUserDto.id,
          },
        });
    };

    async remove(id: bigint | number, payload: TokenPayload) {
        return await this.prismaService.user.update({
          data: {
            updateBy: BigInt(payload.id), // will come from token,
            status: Status.deleted, //will come from enums,
          },
          where: {
            id,
          },
        })
    };
}
