import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { getInformation } from './auth.service';
import { Request } from 'express';
import { checkToken } from 'src/auth/checkFunc';

export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = context.switchToHttp()
  const req = ctx.getRequest<Request>()
  let token = req.headers.authorization;
  return getInformation(jwtDecode(checkToken(token)));
});
