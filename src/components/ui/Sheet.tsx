import { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface SheetContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  return (
    <SheetContext.Provider value={{ isOpen: open !== undefined ? open : isOpen, setIsOpen: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(SheetContext);
  if (!context) throw new Error('SheetTrigger must be used within Sheet');
  
  return (
    <button type="button" onClick={() => context.setIsOpen(true)} className={className}>
      {children}
    </button>
  );
};

export const SheetContent = ({ 
  children, 
  className,
  side = 'right'
}: { 
  children: React.ReactNode; 
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const context = useContext(SheetContext);
  if (!context) throw new Error('SheetContent must be used within Sheet');
  
  if (!context.isOpen) return null;
  
  const sideStyles = {
    top: 'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  };
  
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/80" onClick={() => context.setIsOpen(false)} />
      <div className={cn(
        'fixed bg-background p-6 shadow-lg transition ease-in-out',
        sideStyles[side],
        className
      )}>
        <button
          onClick={() => context.setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export const SheetHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}>{children}</div>
);

export const SheetTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn('text-lg font-semibold text-foreground', className)}>{children}</h2>
);

export const SheetDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);