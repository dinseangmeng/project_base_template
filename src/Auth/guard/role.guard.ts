import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { STATUS_KEY } from '../decorators/role.decorator';
import { RoleEnum } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(STATUS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // console.log(requiredRoles);
    
    const { user } = context.switchToHttp().getRequest();
    // console.log(user);
    
    return requiredRoles.some((role) => user?.statusId == (role));
  }
}