import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-blue-500 hover:bg-blue-400 hover:shadow-button text-white disabled:bg-blue-700 disabled:text-opacity-50 dark:text-white',
        destructive: 'bg-destructive/100 text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-blue-500/10 text-blue-500 hover:bg-blue-500/30 disabled:bg-opacity-0 disabled:text-blue-500 disabled:text-opacity-50 dark:disabled:text-gray-200',
        ghost:
          'bg-opacity-0 text-blue-500 hover:bg-blue-500/30 disabled:bg-opacity-0 disabled:text-blue-500 disabled:text-opacity-50 dark:disabled:text-gray-200',
        link: 'text-primary underline-offset-4 hover:underline',
        tag: 'border border-input text-primary hover:text-white hover:border-blue-500 hover:bg-blue-500',
        tagActive: 'border border-blue-500 bg-blue-500/100 text-white hover:bg-blue-500/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        'lg-adaptive': 'h-10 px-4 md:h-11 md:rounded-md md:px-8',
        icon: 'h-10 w-10',
        'icon-lg': 'h-12 w-12',
        tag: 'rounded-[0] px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button';
      return (
        <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
      );
    },
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
