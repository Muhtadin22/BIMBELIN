import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility untuk menggabungkan class Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95",
          variant === 'primary' 
            ? "bg-energeticOrange-500 text-white hover:bg-energeticOrange-600 shadow-lg shadow-orange-500/30" 
            : "bg-transparent border-2 border-trustBlue-900 text-trustBlue-900 hover:bg-trustBlue-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';