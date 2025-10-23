import { cn } from "@/utils/tailwind";
import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 rounded-md border border-gray-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-white text-primary hover:bg-background shadow-sm hover:shadow-md",
  dark: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm hover:shadow-md border-primary/20",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
  ghost:
    "text-primary hover:bg-muted hover:text-muted-foreground border-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-2.5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    if (asChild) {
      // When asChild is true, we expect the children to be a single React element
      // that we'll clone with our button styles and props
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        ref?: React.Ref<HTMLElement>;
      }>;
      return React.cloneElement(child, {
        ...props,
        className: cn(buttonClasses, child.props?.className),
        ref: ref || child.props?.ref,
      });
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
