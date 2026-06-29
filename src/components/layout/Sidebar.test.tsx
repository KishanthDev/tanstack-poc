import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
    it("renders in expanded state by default", () => {
        render(<Sidebar />);
        expect(screen.getByText("POC")).toBeInTheDocument();
        expect(screen.getByText("Overview")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("renders in collapsed state", () => {
        render(<Sidebar isCollapsed={true} />);
        expect(screen.queryByText("POC")).not.toBeInTheDocument();
        expect(screen.queryByText("Overview")).not.toBeInTheDocument();
        expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    });

    it("calls toggleSidebar when the toggle button is clicked", () => {
        const toggleSidebarMock = jest.fn();
        render(<Sidebar toggleSidebar={toggleSidebarMock} />);

        const toggleButton = screen.getByRole("button", { name: /toggle sidebar/i });
        fireEvent.click(toggleButton);

        expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
    });

    it("shows tooltips when collapsed", async () => {
        render(<Sidebar isCollapsed={true} toggleSidebar={() => { }} />);

        const overviewButton = screen.getByRole("button", { name: /overview/i });
        fireEvent.mouseOver(overviewButton);

        // Using findByRole to wait for the tooltip to appear
        const overviewTooltip = await screen.findByRole("tooltip", { name: /overview/i });
        expect(overviewTooltip).toBeInTheDocument();
    });

    it("does not show tooltips when expanded", () => {
        render(<Sidebar isCollapsed={false} toggleSidebar={() => { }} />);

        const overviewButton = screen.getByRole("button", { name: /overview/i });
        fireEvent.mouseOver(overviewButton);

        const overviewTooltip = screen.queryByRole("tooltip", { name: /overview/i });
        expect(overviewTooltip).not.toBeInTheDocument();
    });
});