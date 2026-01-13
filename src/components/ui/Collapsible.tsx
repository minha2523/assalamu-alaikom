import { useState, createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface CollapsibleContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Collapsible = ({ open, onOpenChange, children, className }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  return (
    <CollapsibleContext.Provider value={{ isOpen: open !== undefined ? open : isOpen, setIsOpen: handleOpenChange }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

export const CollapsibleTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error('CollapsibleTrigger must be used within Collapsible');
  
  return (
    <button 
      type="button" 
      onClick={() => context.setIsOpen(!context.isOpen)} 
      className={cn('w-full', className)}
    >
      {children}
    </button>
  );
};

export const CollapsibleContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error('CollapsibleContent must be used within Collapsible');
  
  if (!context.isOpen) return null;
  
  return (
    <div className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
};