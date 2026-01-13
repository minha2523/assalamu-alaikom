import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

export const Pagination = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props} />
);

export const PaginationContent = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
);

export const PaginationItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn('', className)} {...props} />
);

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

export const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors',
      isActive 
        ? 'border bg-background' 
        : 'hover:bg-accent hover:text-accent-foreground',
      className
    )}
    {...props}
  />
);

export const PaginationPrevious = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    aria-label="Go to previous page"
    className={cn('flex items-center gap-1 pl-2.5 pr-4 h-10 rounded-md hover:bg-accent', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </a>
);

export const PaginationNext = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    aria-label="Go to next page"
    className={cn('flex items-center gap-1 pl-4 pr-2.5 h-10 rounded-md hover:bg-accent', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </a>
);

export const PaginationEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);