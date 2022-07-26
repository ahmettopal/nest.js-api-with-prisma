import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkToken } from 'src/auth/checkFunc';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    validate(token: string) {
      var tokenResult = checkToken(token)
      try { return this.jwtService.verify(tokenResult); }
      catch (error) { throw new UnauthorizedException('Invalid Token!');}
    }
  
    decode(token: string) {
      var tokenResult = checkToken(token)
      try {
        const tokenInformation = this.jwtService.decode(tokenResult);
        return getInformation(tokenInformation);
      } catch (error) { throw new UnauthorizedException('Invalid Token!');}
    }
}

export function getInformation(payload: any): TokenPayload {
    return {
      id: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'],
      email: payload['email'],
      refreshToken: payload['refreshtoken'],
      clientId: payload['ClientId'],
      claims: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    }
  }

  export type TokenPayload = {
    id: string;
    email: string;
    clientId: string;
    refreshToken: string;
    claims: string[] | string;
  };
