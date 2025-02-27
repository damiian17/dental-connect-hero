
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = "rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-dental-primary text-white shadow-md hover:bg-dental-primary/90 hover:shadow-lg hover:scale-[1.02] focus:ring-dental-primary/50",
      secondary: "bg-dental-secondary text-white shadow-md hover:bg-dental-secondary/90 hover:shadow-lg hover:scale-[1.02] focus:ring-dental-secondary/50",
      outline: "bg-transparent border border-dental-primary text-dental-primary hover:bg-dental-primary/10 hover:shadow-md focus:ring-dental-primary/50",
      ghost: "bg-transparent text-dental-primary hover:bg-dental-primary/10 focus:ring-dental-primary/50",
      link: "bg-transparent text-dental-primary underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0 p-0 shadow-none",
    };
    
    const sizes = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-4 px-8 text-lg",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          variant !== 'link' && "transform",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
