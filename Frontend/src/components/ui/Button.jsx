import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    // Variant styles
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200",
        secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
        outline: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-100",
        dangerOutline: "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300",
    };

    // Size styles
    const sizes = {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
        xl: "h-14 px-8 text-lg gap-3",
        icon: "h-10 w-10 p-0",
    };

    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;

    return (
        <button
            className={`${baseStyles} ${variantClasses} ${sizeClasses} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}

            {!isLoading && leftIcon && (
                <span className="flex items-center justify-center">{leftIcon}</span>
            )}

            {children}

            {!isLoading && rightIcon && (
                <span className="flex items-center justify-center">{rightIcon}</span>
            )}
        </button>
    );
};

export default Button;
