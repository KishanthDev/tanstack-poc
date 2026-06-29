import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainLayout from "./MainLayout";

jest.mock("@/components/layout/Sidebar", () => ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) => (
    <div data-testid="sidebar" data-collapsed={isCollapsed}>
        <button onClick={toggleSidebar}>Toggle</button>
    </div>
));

jest.mock("@/components/layout/Navbar", () => () => <div data-testid="navbar">Navbar</div>);

describe("MainLayout", () => {
    it("renders children and layout components", () => {
        render(<MainLayout><div>Main Content</div></MainLayout>);

        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByText("Main Content")).toBeInTheDocument();
    });

    it("starts with an expanded sidebar", () => {
        render(<MainLayout><div>Main Content</div></MainLayout>);
        const sidebarWrapper = screen.getByTestId("sidebar").parentElement;
        const contentWrapper = screen.getByTestId("navbar").parentElement;

        expect(sidebarWrapper).toHaveClass("lg:w-64");
        expect(contentWrapper).toHaveClass("lg:pl-64");
    });

    it("collapses the sidebar when toggle is called", () => {
        render(<MainLayout><div>Main Content</div></MainLayout>);
        const sidebarWrapper = screen.getByTestId("sidebar").parentElement;
        const contentWrapper = screen.getByTestId("navbar").parentElement;

        fireEvent.click(screen.getByRole("button", { name: "Toggle" }));

        expect(sidebarWrapper).toHaveClass("lg:w-20");
        expect(contentWrapper).toHaveClass("lg:pl-20");
    });
});