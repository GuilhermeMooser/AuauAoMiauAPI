import { SetMetadata } from '@nestjs/common';

export const RESOURCE_OWNER_KEY = 'resourceOwner';
export const ResourceOwner = (param: string = 'id', userField: string = 'id') =>
  SetMetadata(RESOURCE_OWNER_KEY, { param, userField });
