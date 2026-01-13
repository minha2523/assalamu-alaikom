import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface DropdownMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
  
  return (
    <button type="button" onClick={() => context.setIsOpen(!context.isOpen)} className={className}>
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(DropdownMenuContext);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        context?.setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [context]);
  
  if (!context?.isOpen) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        'absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50',
        'animate-in fade-in-0 zoom-in-95',
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ 
  children, 
  className, 
  onClick,
  disabled 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const context = useContext(DropdownMenuContext);
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      context?.setIsOpen(false);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
};

export const DropdownMenuSeparator = ({ className }: { className?: string }) => (
  <div className={cn('-mx-1 my-1 h-px bg-muted', className)} />
);

export const DropdownMenuLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('px-2 py-1.5 text-sm font-semibold', className)}>{children}</div>
);