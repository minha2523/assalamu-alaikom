import { useState, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  children: React.ReactNode;
  className?: string;
}

export const Accordion = ({ type = 'single', defaultValue = [], children, className }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);
  
  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems(prev => prev.includes(value) ? [] : [value]);
    } else {
      setOpenItems(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  return <div className={cn('border-b', className)} data-value={value}>{children}</div>;
};

export const AccordionTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');
  
  const isOpen = context.openItems.includes(value);
  
  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left',
        className
      )}
    >
      {children}
      <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
    </button>
  );
};

export const AccordionContent = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');
  
  const isOpen = context.openItems.includes(value);
  
  if (!isOpen) return null;
  
  return (
    <div className={cn('overflow-hidden text-sm transition-all pb-4 pt-0', className)}>
      {children}
    </div>
  );
};