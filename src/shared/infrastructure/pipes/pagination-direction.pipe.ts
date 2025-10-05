import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PaginationDirectionPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return null;
    if (value?.toLowerCase() === 'desc') return 'DESC';
    return 'ASC';
  }
}
