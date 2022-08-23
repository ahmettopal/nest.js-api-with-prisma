import { Module } from '@nestjs/common';
import { BlockedController } from './blocked.controller';
import { BlockedService } from './blocked.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BlockedController],
  providers: [BlockedService,PrismaService],
  imports: [AuthModule]
})
export class BlockedModule {}
