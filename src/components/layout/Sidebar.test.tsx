import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
    it("renders expanded sidebar by default", () => {
        render(<Sidebar />);

        expect(screen.getByText("POC")).toBeInTheDocument();
        expect(screen.getByText("Overview")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
it("hides the logo text when collapsed", () => {
  render(<Sidebar isCollapsed />);

  expect(screen.getByText("POC")).toHaveClass("hidden");
});

    it("renders hidden labels when collapsed", () => {
        render(<Sidebar isCollapsed />);

        expect(screen.getByText("Overview")).toHaveClass("hidden");
        expect(screen.getByText("Settings")).toHaveClass("hidden");
    });

    it("calls toggleSidebar when toggle button is clicked", async () => {
        const user = userEvent.setup();
        const toggleSidebar = vi.fn();

        render(<Sidebar toggleSidebar={toggleSidebar} />);

        await user.click(
            screen.getByRole("button", {
                name: /toggle sidebar/i,
            })
        );

        expect(toggleSidebar).toHaveBeenCalledTimes(1);
    });

    it("renders collapse icon when expanded", () => {
        const { container } = render(
            <Sidebar toggleSidebar={() => { }} />
        );

        expect(
            container.querySelector(".lucide-panel-left-close")
        ).toBeInTheDocument();
    });

    it("renders expand icon when collapsed", () => {
        const { container } = render(
            <Sidebar
                isCollapsed
                toggleSidebar={() => { }}
            />
        );

        expect(
            container.querySelector(".lucide-panel-right-close")
        ).toBeInTheDocument();
    });

    it("renders two navigation buttons", () => {
        render(<Sidebar />);

        expect(
            screen.getByRole("button", {
                name: /overview/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /settings/i,
            })
        ).toBeInTheDocument();
    });
});