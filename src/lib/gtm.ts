"use client";

import { sendGTMEvent } from "@next/third-parties/google";

// Custom event types for better type safety
export interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  sendGTMEvent({
    event: "button_click",
    button_name: buttonName,
    button_location: location || "unknown",
  });
};

// Track ticket purchase button clicks
export const trackTicketPurchaseClick = (
  ticketType?: string,
  location?: string
) => {
  sendGTMEvent({
    event: "ticket_purchase_click",
    ticket_type: ticketType || "general",
    button_location: location || "unknown",
    event_category: "ecommerce",
    event_action: "click",
    event_label: `ticket_purchase_${ticketType || "general"}`,
  });
};

// Track page views (if needed)
export const trackPageView = (pageName: string, pagePath?: string) => {
  sendGTMEvent({
    event: "page_view",
    page_name: pageName,
    page_path: pagePath || window.location.pathname,
  });
};

// Track form submissions (if needed)
export const trackFormSubmission = (formName: string, formType?: string) => {
  sendGTMEvent({
    event: "form_submission",
    form_name: formName,
    form_type: formType || "contact",
    event_category: "engagement",
    event_action: "submit",
  });
};

// Track external link clicks
export const trackExternalLinkClick = (linkUrl: string, linkText?: string) => {
  sendGTMEvent({
    event: "external_link_click",
    link_url: linkUrl,
    link_text: linkText || "unknown",
    event_category: "outbound",
    event_action: "click",
  });
};

// Generic event tracker for custom events
export const trackCustomEvent = (eventData: GTMEvent) => {
  sendGTMEvent(eventData);
};
