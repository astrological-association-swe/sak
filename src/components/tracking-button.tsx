"use client";

import { Button } from "./button";
import { Star } from "lucide-react";
import { trackTicketPurchaseClick } from "@/lib/gtm";

interface TrackingButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  trackingName: string;
  trackingLocation: string;
  showIcon?: boolean;
}

export function TrackingButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  trackingName,
  trackingLocation,
  showIcon = false,
}: TrackingButtonProps) {
  const handleClick = () => {
    trackTicketPurchaseClick("general", trackingLocation);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild
      trackingName={trackingName}
      trackingLocation={trackingLocation}
      onTrackingClick={handleClick}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {showIcon && <Star size={16} />}
        {children}
      </a>
    </Button>
  );
}
