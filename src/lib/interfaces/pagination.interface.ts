export interface PaginationData<T = []> {
  data: T;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  nextPage: null | number;
  prevPage: null | number;
  currentPage: number;
}
