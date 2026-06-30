import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import Dashboard from "./Dashboard"; // Adjust the import path if necessary

// Mock window.matchMedia (Required by Mantine for layout calculations in JSDOM)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe("Dashboard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderDashboard = () => {
        return render(
            <MantineProvider>
                <Dashboard />
            </MantineProvider>
        );
    };

    it("renders the main dashboard headers and actions", () => {
        renderDashboard();

        // Check for the main title
        expect(screen.getByRole("heading", { name: "Dashboard", level: 2 })).toBeInTheDocument();

        // Check for the download button
        expect(screen.getByRole("button", { name: /download report/i })).toBeInTheDocument();
    });

    it("renders the statistic cards with correct data", () => {
        renderDashboard();

        // Verify a sample of the stats mapped from the `stats` array
        expect(screen.getByText("Total Revenue")).toBeInTheDocument();
        expect(screen.getByText("$45,231.89")).toBeInTheDocument();
        expect(screen.getByText("+20.1% from last month")).toBeInTheDocument();

        expect(screen.getByText("Active Users")).toBeInTheDocument();
        expect(screen.getByText("+573")).toBeInTheDocument();
        expect(screen.getByText("+201 since last hour")).toBeInTheDocument();
    });

    it("renders the chart section with month labels", () => {
        renderDashboard();

        // Check chart headers
        expect(screen.getByRole("heading", { name: "Overview", level: 4 })).toBeInTheDocument();
        expect(screen.getByText("Monthly revenue breakdown for 2024.")).toBeInTheDocument();

        // Verify that the month labels at the bottom of the chart rendered
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach((month) => {
            expect(screen.getByText(month)).toBeInTheDocument();
        });
    });

    it("handles mouse enter and leave events on the chart bars", () => {
        const { container } = renderDashboard();

        // Mantine's <Card> also renders a .mantine-Paper-root class. 
        // We filter the NodeList to grab ONLY the elements with 'cursor: pointer' 
        // which isolates our chart bars from the main layout cards.
        const allPapers = container.querySelectorAll('.mantine-Paper-root');
        const bars = Array.from(allPapers).filter(
            (el) => (el as HTMLElement).style.cursor === "pointer"
        );

        // Verify we found our exactly 12 monthly bars
        expect(bars.length).toBe(12);

        const firstBar = bars[0] as HTMLElement;

        // Initial opacity should be 0.25 (as defined in the style prop)
        expect(firstBar.style.opacity).toBe("0.25");

        // Simulate Mouse Enter
        fireEvent.mouseEnter(firstBar);
        expect(firstBar.style.opacity).toBe("1");

        // Simulate Mouse Leave
        fireEvent.mouseLeave(firstBar);

        // Note: Even though your component uses ".25", JSDOM's CSS parser 
        // automatically normalizes it to "0.25".
        expect(firstBar.style.opacity).toBe("0.25");
    });

    it("renders the recent sales list", () => {
        renderDashboard();

        // Check Recent Sales headers
        expect(screen.getByRole("heading", { name: "Recent Sales", level: 4 })).toBeInTheDocument();
        expect(screen.getByText("You made 265 sales this month.")).toBeInTheDocument();

        // Verify a sample of the sales records mapped from the `sales` array
        expect(screen.getByText("Olivia Martin")).toBeInTheDocument();
        expect(screen.getByText("olivia@email.com")).toBeInTheDocument();
        expect(screen.getByText("+$1,999")).toBeInTheDocument();

        expect(screen.getByText("Sofia Davis")).toBeInTheDocument();
        expect(screen.getByText("sofia@email.com")).toBeInTheDocument();
        expect(screen.getByText("+$39")).toBeInTheDocument();
    });
});