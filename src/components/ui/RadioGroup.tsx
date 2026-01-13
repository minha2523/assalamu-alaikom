import { useState, createContext, useContext } from 'react';
import { Circle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup = ({ value = '', onValueChange, children, className }: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  
  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };
  
  return (
    <RadioGroupContext.Provider value={{ value: selectedValue, onChange: handleChange }}>
      <div className={cn('grid gap-2', className)}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

interface RadioGroupItemProps {
  value: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const RadioGroupItem = ({ value, label, disabled, className }: RadioGroupItemProps) => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('RadioGroupItem must be used within RadioGroup');
  
  const isSelected = context.value === value;
  
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', disabled && 'cursor-not-allowed opacity-50', className)}>
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        disabled={disabled}
        onClick={() => !disabled && context.onChange(value)}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
      >
        {isSelected && <Circle className="h-2.5 w-2.5 fill-current mx-auto" />}
      </button>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};