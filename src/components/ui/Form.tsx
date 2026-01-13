import { createContext, useContext, useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface FormFieldContextValue {
  id: string;
  error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const FormField = ({ 
  children, 
  error 
}: { 
  children: React.ReactNode; 
  error?: string;
}) => {
  const id = useId();
  
  return (
    <FormFieldContext.Provider value={{ id, error }}>
      <div className="space-y-2">
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

export const FormLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(FormFieldContext);
  
  return (
    <label 
      htmlFor={context?.id} 
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        context?.error && 'text-destructive',
        className
      )}
    >
      {children}
    </label>
  );
};

export const FormControl = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(FormFieldContext);
  
  return (
    <div id={context?.id}>
      {children}
    </div>
  );
};

export const FormDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};

export const FormMessage = ({ className }: { className?: string }) => {
  const context = useContext(FormFieldContext);
  
  if (!context?.error) return null;
  
  return (
    <p className={cn('text-sm font-medium text-destructive', className)}>
      {context.error}
    </p>
  );
};