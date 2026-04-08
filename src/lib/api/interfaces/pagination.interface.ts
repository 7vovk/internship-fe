export interface Pagination<T = []> {
  data: T;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  nextPage: number;
  prevPage: null | number;
  currentPage: number;
}
