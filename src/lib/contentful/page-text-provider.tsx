"use client";

import React, { ReactNode } from "react";
import { TextProvider } from "./text-context";
import { Text } from "./contentful-types";

interface PageTextProviderProps {
  children: ReactNode;
  texts: Text[];
}

export function PageTextProvider({ children, texts }: PageTextProviderProps) {
  return (
    <TextProvider texts={texts}>
      <div className="min-h-screen">{children}</div>
    </TextProvider>
  );
}
