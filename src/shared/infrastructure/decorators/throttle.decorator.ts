import { applyDecorators } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

// Short: 3 req por 1 segundo
export function ThrottleShort() {
  return applyDecorators(Throttle({ short: { limit: 3, ttl: 1000 } }));
}

// Medium: 20 req por 10 segundos
export function ThrottleMedium() {
  return applyDecorators(Throttle({ medium: { limit: 20, ttl: 10000 } }));
}

// Long: 100 req por 60 segundos
export function ThrottleLong() {
  return applyDecorators(Throttle({ long: { limit: 100, ttl: 60000 } }));
}
