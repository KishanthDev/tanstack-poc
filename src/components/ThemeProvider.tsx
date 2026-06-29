"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Note: If you get a type error here, you can change the import to:
// import { ThemeProviderProps } from "next-themes/dist/types"
// or just use `any` if you are in a rush.
import { type ThemeProviderProps } from "next-themes" 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}