import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

export const Breadcrumb = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav aria-label="breadcrumb" className={className} {...props}>
    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {children}
    </ol>
  </nav>
);

export const BreadcrumbList = ({ children, className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className={cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', className)} {...props}>
    {children}
  </ol>
);

export const BreadcrumbItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn('inline-flex items-center gap-1.5', className)} {...props}>
    {children}
  </li>
);

export const BreadcrumbLink = ({ 
  className, 
  children,
  href,
  ...props 
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    className={cn('transition-colors hover:text-foreground', className)}
    {...props}
  >
    {children}
  </a>
);

export const BreadcrumbPage = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  >
    {children}
  </span>
);

export const BreadcrumbSeparator = ({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
    {children || <ChevronRight />}
  </li>
);

export const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);