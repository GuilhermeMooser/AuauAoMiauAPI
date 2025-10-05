import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PaginationLimitPipe implements PipeTransform {
  transform(value: string) {
    if (!value || +value > 100) return 100;
    return +value;
  }
}
