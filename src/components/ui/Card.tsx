
import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline' | 'benefit' | 'service' | 'testimonial' | 'whyChoose';
  hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = true, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl p-6 overflow-hidden";
    
    const variants = {
      default: "bg-white shadow-md",
      glass: "glass-card",
      outline: "bg-white border border-gray-200",
      benefit: "benefit-card",
      service: "service-card",
      testimonial: "testimonial-card",
      whyChoose: "why-choose-card"
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverEffect && "hover-shadow-effect",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
