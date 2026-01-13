import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export const Popover = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('PopoverTrigger must be used within Popover');
  
  return (
    <button type="button" onClick={() => context.setIsOpen(!context.isOpen)} className={className}>
      {children}
    </button>
  );
};

export const PopoverContent = ({ 
  children, 
  className,
  align = 'center'
}: { 
  children: React.ReactNode; 
  className?: string;
  align?: 'start' | 'center' | 'end';
}) => {
  const context = useContext(PopoverContext);
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
  
  const alignClass = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };
  
  return (
    <div
      ref={ref}
      className={cn(
        'absolute mt-2 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none z-50',
        'animate-in fade-in-0 zoom-in-95',
        alignClass[align],
        className
      )}
    >
      {children}
    </div>
  );
};