import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'src/auth/auth.service';
import { Status } from 'src/base/enums';
import { Filters } from 'src/base/filters';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createPostDto: CreatePostDto, payload:TokenPayload){
        return await this.prismaService.post.create({
            data: {
                ...createPostDto,
                createBy: BigInt(payload.id), // will come from token,
                status: Status.active, //will come from enums,
            }
        })
    };

    async findAll(filters: Filters, payload: TokenPayload) {
        return {
          data: await this.prismaService.post.findMany({
            where: {
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
          count: await this.prismaService.post.count({
            where: {
              status: {
                equals: filters.status ? filters.status : Status.active,
              },
            },
          })
        };
    };

    findOne(id: bigint | number) {
        return this.prismaService.post.findUnique({
          where: {
            id,
          },
        });
    };

    update(updatePostDto: UpdatePostDto, payload: TokenPayload) {
        return this.prismaService.post.update({
          data: {
            ...updatePostDto,
            updateBy: BigInt(payload.id), // will come from token,
          },
          where: {
            id: updatePostDto.id,
          },
        });
    };

    async remove(id: bigint | number, payload: TokenPayload) {
        return await this.prismaService.post.update({
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