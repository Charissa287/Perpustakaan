import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from
'@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}
canActivate(context: ExecutionContext): boolean {
const requiredRoles = this.reflector.get<UserRole[]>(
'roles',
context.getHandler(),
);
if (!requiredRoles) return true;
const request = context.switchToHttp().getRequest();
const {user} = context.switchToHttp().getRequest();

if (!requiredRoles.includes(user.role)) {
    throw new ForbiddenException(
        'Halaman tidak dapat ditemukan!',
    );
}
return requiredRoles.includes(user.role);
}
}