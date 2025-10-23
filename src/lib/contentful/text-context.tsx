"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Text, TextKey } from "./contentful-types";

interface TextContextType {
  texts: Text[];
  isLoading: boolean;
  error: string | null;
}

const TextContext = createContext<TextContextType | undefined>(undefined);

interface TextProviderProps {
  children: ReactNode;
  texts: Text[];
  isLoading?: boolean;
  error?: string | null;
}

export function TextProvider({
  children,
  texts,
  isLoading = false,
  error = null,
}: TextProviderProps) {
  const value: TextContextType = {
    texts,
    isLoading,
    error,
  };

  return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
}

export function useText(): (key: TextKey) => string {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error("useText must be used within a TextProvider");
  }

  return (key: TextKey): string => {
    const text = context.texts.find((t) => t.fields.textKey === key);
    return text?.fields.textValue || "";
  };
}
