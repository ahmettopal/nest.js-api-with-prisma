import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const claim = this.reflector.get<string>('claim', context.getHandler());

    const [req] = context.getArgs();
    const token = req.headers.authorization;
    if (token === undefined) throw new UnauthorizedException('Authorization Header Not Found!');
    
    const tokenInformation = this.authService.decode(token);
    const claims = tokenInformation.claims;
    if (claims && isArray(claims) && claims.includes(claim))
      return true;

      throw new UnauthorizedException('Authorization Denied!');
  }
}
export const Claim = (claim: string) => SetMetadata('claim', claim);
