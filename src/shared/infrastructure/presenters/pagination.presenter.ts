import { ApiProperty } from '@nestjs/swagger';

export class MetaPresenter {
  @ApiProperty({
    description: 'Número total de itens presentes no banco de dados',
  })
  totalItems: number;

  @ApiProperty({ description: 'Número de itens vindos na página atual' })
  itemCount: number;

  @ApiProperty({ description: 'Número de itens máximos vindos por página' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Número total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Número da página atual' })
  currentPage: number;

  constructor(
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.totalItems = totalItems;
    this.itemCount = itemCount;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}

export class PaginationPresenter<Item> {
  @ApiProperty({ description: 'Paginated items array' })
  items: Item[];

  @ApiProperty({ description: 'Pagination infos' })
  meta: MetaPresenter;

  constructor(items: Item[], meta: MetaPresenter) {
    this.items = items;
    this.meta = meta;
  }
}
