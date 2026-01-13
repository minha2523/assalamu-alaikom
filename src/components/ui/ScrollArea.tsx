import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ScrollArea = ({ className, children, ...props }: ScrollAreaProps) => {
  return (
    <div
      className={cn('relative overflow-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
};