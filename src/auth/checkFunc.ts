import { UnauthorizedException } from "@nestjs/common";

export function checkToken(token: string): string {
    if (!token) throw new UnauthorizedException('Token Undefined!');
    if (!token.includes(' ')) throw new UnauthorizedException('Token Schema Undefined!');
    const tokenPartII = token.split(' ')[1];
    if (!tokenPartII) throw new UnauthorizedException('Token Schema Undefined!');
    return tokenPartII
}