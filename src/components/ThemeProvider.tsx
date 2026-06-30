"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MantineProvider defaultColorScheme="auto">
            {children}
        </MantineProvider>
    );
}