import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children: React.ReactNode;
}

export const AspectRatio = ({ ratio = 1, className, children, style, ...props }: AspectRatioProps) => {
  return (
    <div
      className={cn('relative w-full', className)}
      style={{ paddingBottom: `${100 / ratio}%`, ...style }}
      {...props}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};