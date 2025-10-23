"use client";

import { cn } from "@/utils/tailwind";
import React, { forwardRef } from "react";
import { trackButtonClick } from "@/lib/gtm";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  // GTM tracking props
  trackingName?: string;
  trackingLocation?: string;
  onTrackingClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-300 rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95";

const variants = {
  primary:
    "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent border-accent/30 shadow-lg hover:shadow-xl hover:shadow-accent/25",
  dark: "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground hover:from-primary-dark hover:to-primary border-primary/30 shadow-lg hover:shadow-xl hover:shadow-primary/25",
  outline:
    "border-2 border-accent text-accent bg-transparent hover:bg-gradient-to-r hover:from-accent hover:to-accent/90 hover:text-accent-foreground shadow-md hover:shadow-lg hover:shadow-accent/20",
  ghost:
    "text-primary hover:bg-muted hover:text-muted-foreground border-transparent hover:shadow-md",
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
      trackingName,
      trackingLocation,
      onTrackingClick,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track button click if tracking props are provided
      if (trackingName) {
        trackButtonClick(trackingName, trackingLocation);
      }

      // Call custom tracking function if provided
      if (onTrackingClick) {
        onTrackingClick();
      }

      // Call original onClick if provided
      if (onClick) {
        onClick(event);
      }
    };
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
        onClick?: (event: React.MouseEvent<HTMLElement>) => void;
      }>;

      // Combine click handlers for asChild
      const childOnClick = child.props?.onClick;
      const combinedOnClick = (event: React.MouseEvent<HTMLElement>) => {
        // Track button click if tracking props are provided
        if (trackingName) {
          trackButtonClick(trackingName, trackingLocation);
        }

        // Call custom tracking function if provided
        if (onTrackingClick) {
          onTrackingClick();
        }

        // Call child's onClick if provided
        if (childOnClick) {
          childOnClick(event);
        }
      };

      return React.cloneElement(child, {
        ...props,
        className: cn(buttonClasses, child.props?.className),
        ref: ref || child.props?.ref,
        onClick: combinedOnClick,
      });
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
