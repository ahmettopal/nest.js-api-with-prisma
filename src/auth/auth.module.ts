import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtConfigService } from './jwt.config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
