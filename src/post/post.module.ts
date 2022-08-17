import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [PostController],
    providers: [PostService, PrismaService],
    imports: [AuthModule]
})
export class PostModule {}