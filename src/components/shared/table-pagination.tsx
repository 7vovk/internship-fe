import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import { Routes } from "@/config/site.enums";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/shared/ui/pagination";
import { Label } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const TablePagination = async ({
  page,
  limit,
  totalItems,
  totalPages,
  prevPage,
  nextPage,
}: TablePaginationProps) => {
  const tPagination = await getTranslations("Pagination");
  const safeTotalPages = Math.max(totalPages, 1);
  const currentPage = Math.min(Math.max(page, 1), safeTotalPages);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = totalItems === 0 ? 0 : Math.min(currentPage * limit, totalItems);

  const buildHref = (nextPage: number, nextLimit = limit) =>
    `${Routes.USERS}?page=${nextPage}&limit=${nextLimit}`;

  const pageWindowStart = Math.max(1, currentPage - 1);
  const pageWindowEnd = Math.min(safeTotalPages, currentPage + 1);
  const visiblePages = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, index) => pageWindowStart + index,
  );
  const isPrevDisabled = prevPage === null;
  const isNextDisabled = nextPage === null;
  return (
    <div className="p-4 flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center">
      <div className="flex shrink-0 items-center gap-3">
        <Label>{tPagination("rowsPerPage")}</Label>
        <div className="flex items-center gap-1">
          {PAGE_SIZE_OPTIONS.map((size) => (
            <Link
              key={size}
              href={buildHref(1, size)}
              className={`text-sm underline-offset-4 ${
                size === limit
                  ? "text-foreground underline"
                  : "text-muted-foreground hover:underline"
              }`}
              aria-current={size === limit ? "page" : undefined}
            >
              {size}
            </Link>
          ))}
        </div>
      </div>
      <div className="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p
          className="text-muted-foreground text-sm whitespace-nowrap"
          aria-live="polite"
        >
          {tPagination("showing")}
          <span className="text-foreground">{start}</span> {tPagination("to")}
          <span className="text-foreground">{end}</span> {tPagination("of")}
          <span className="text-foreground">{totalItems}</span>{" "}
          {tPagination("users")}
        </p>
      </div>
      <Pagination className="w-fit max-sm:mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={isPrevDisabled ? buildHref(currentPage) : buildHref(1)}
              aria-label="Go to first page"
              size="icon"
              className={`rounded-md ${isPrevDisabled ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={isPrevDisabled}
              tabIndex={isPrevDisabled ? -1 : undefined}
            >
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={
                isPrevDisabled
                  ? buildHref(currentPage)
                  : buildHref(Math.max(currentPage - 1, 1))
              }
              aria-label="Go to previous page"
              size="icon"
              className={`rounded-md ${isPrevDisabled ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={isPrevDisabled}
              tabIndex={isPrevDisabled ? -1 : undefined}
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
          {visiblePages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={buildHref(pageNumber)}
                isActive={pageNumber === currentPage}
                className="rounded-md"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              href={
                isNextDisabled
                  ? buildHref(currentPage)
                  : buildHref(Math.min(currentPage + 1, safeTotalPages))
              }
              aria-label="Go to next page"
              size="icon"
              className={`rounded-md ${isNextDisabled ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={isNextDisabled}
              tabIndex={isNextDisabled ? -1 : undefined}
            >
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={
                isNextDisabled
                  ? buildHref(currentPage)
                  : buildHref(safeTotalPages)
              }
              aria-label="Go to last page"
              size="icon"
              className={cn(
                "rounded-md",
                isNextDisabled && "pointer-events-none opacity-50",
              )}
              aria-disabled={isNextDisabled}
              tabIndex={isNextDisabled ? -1 : undefined}
            >
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
