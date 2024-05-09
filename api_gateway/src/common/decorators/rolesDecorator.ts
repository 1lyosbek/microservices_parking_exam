import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../consts/consts';
import { RoleEnum } from '../enums/roleEnum';


export const RolesDecorator = (...roles: RoleEnum[]) =>
    SetMetadata(ROLES_KEY, roles);