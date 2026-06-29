import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

jest.mock("next-themes", () => ({
    ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("ThemeProvider", () => {
    it("renders children and passes props to NextThemesProvider", () => {
        render(
            <ThemeProvider attribute="class" defaultTheme="dark">
                <div>Child Content</div>
            </ThemeProvider>
        );

        expect(screen.getByText("Child Content")).toBeInTheDocument();
        expect(NextThemesProvider).toHaveBeenCalledWith(expect.objectContaining({ attribute: "class", defaultTheme: "dark" }), {});
    });
});