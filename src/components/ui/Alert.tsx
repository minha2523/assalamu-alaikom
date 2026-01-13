import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  children: React.ReactNode;
}

export const Alert = ({ variant = 'default', className, children, ...props }: AlertProps) => {
  const variants = {
    default: 'bg-background text-foreground border',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive bg-destructive/10',
    success: 'border-green-500/50 text-green-700 dark:text-green-400 bg-green-500/10',
    warning: 'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 bg-yellow-500/10',
  };
  
  const icons = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle,
    warning: AlertCircle,
  };
  
  const Icon = icons[variant];
  
  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 flex gap-3',
        variants[variant],
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
};

export const AlertTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props}>
    {children}
  </h5>
);

export const AlertDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props}>
    {children}
  </div>
);