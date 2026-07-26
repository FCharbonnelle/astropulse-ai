import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-900/50 hover:shadow-purple-600/40 hover:brightness-110 border border-purple-400/30',
        gold:
          'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-900/40 hover:shadow-amber-500/50 hover:brightness-110 border border-yellow-200/50',
        outline:
          'border border-purple-500/40 bg-purple-950/20 text-purple-200 hover:bg-purple-900/40 hover:border-purple-400/80 shadow-md',
        ghost:
          'text-purple-300 hover:bg-purple-900/30 hover:text-white',
        danger:
          'bg-rose-600/80 text-white hover:bg-rose-700 shadow-lg shadow-rose-900/40',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 px-3 text-xs rounded-lg',
        lg: 'h-14 px-8 text-base rounded-2xl font-bold tracking-wide',
        icon: 'h-10 w-10 p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
