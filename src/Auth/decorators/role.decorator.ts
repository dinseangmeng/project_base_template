import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enum/role.enum';
export const STATUS_KEY="statusid"
export const Status = (...statusid: RoleEnum[]) => SetMetadata(STATUS_KEY, statusid);
