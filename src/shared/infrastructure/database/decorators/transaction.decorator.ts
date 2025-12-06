import { applyDecorators } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

export function Transaction() {
  return applyDecorators(Transactional());
}
