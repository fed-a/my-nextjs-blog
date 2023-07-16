'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface ComboboxProps {
  value?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  withSearch?: boolean;
  onChange?: (_: string) => void;
}

// TODO
const ComboboxComponent = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (props: ComboboxProps, ref) => {
    const { value, options = [], placeholder, withSearch, onChange } = props;
    const [open, setOpen] = React.useState(false);
    const [innerValue, setInnerValue] = React.useState('');

    const currentValue = React.useMemo(() => {
      return value ?? innerValue;
    }, [innerValue, value]);

    const handleChange = React.useCallback(
      (newValue: string) => {
        if (onChange) {
          onChange(newValue);
        }
        setInnerValue(newValue);
      },
      [onChange],
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            ref={ref}
          >
            {currentValue
              ? options.find((option) => option.value === currentValue)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            {withSearch && <CommandInput placeholder={placeholder ?? ''} />}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  className="cursor-pointer"
                  onSelect={(newValue) => {
                    handleChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentValue === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
ComboboxComponent.displayName = 'Combobox';

export const Combobox = React.memo(ComboboxComponent);
