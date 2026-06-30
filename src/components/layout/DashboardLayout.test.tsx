import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import Dashboard from "./DashboardLayout"; // Adjust path if needed

// 1. Mock window.matchMedia (Required by Mantine for layout calculations in test environments)
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

// 2. Mock MainLayout to keep the test isolated to just the Dashboard
vi.mock("../layouts/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-main-layout">{children}</div>
  ),
}));

// 3. Mock the useMantineColorScheme hook while keeping the rest of @mantine/core intact
const mockToggleColorScheme = vi.fn();

vi.mock("@mantine/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mantine/core")>();
  return {
    ...actual,
    useMantineColorScheme: () => ({
      colorScheme: "light",
      toggleColorScheme: mockToggleColorScheme,
    }),
  };
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

  it("renders the dashboard headers and is wrapped in MainLayout", () => {
    renderDashboard();

    expect(screen.getByTestId("mock-main-layout")).toBeInTheDocument();
    
    // Using getAllByText/Heading or specific queries helps if "Dashboard" appears multiple places, 
    // but getByRole is the safest for main titles.
    expect(screen.getByRole("heading", { name: "Dashboard", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Welcome back, here is what's happening today.")).toBeInTheDocument();
  });

  it("renders the top stat cards accurately", () => {
    renderDashboard();

    // Check for a few specific stats mapped from STATS_DATA
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$45,231.89")).toBeInTheDocument();
    
    expect(screen.getByText("Subscriptions")).toBeInTheDocument();
    expect(screen.getByText("2,350")).toBeInTheDocument();
  });

  it("renders the chart area and recent sales list", () => {
    renderDashboard();

    // Chart Area Headers
    expect(screen.getByText("Revenue Overview")).toBeInTheDocument();
    expect(screen.getByText("Monthly revenue breakdown for 2024")).toBeInTheDocument();

    // Recent Sales Headers & Data
    expect(screen.getByText("Recent Sales")).toBeInTheDocument();
    expect(screen.getByText("Olivia Martin")).toBeInTheDocument();
    expect(screen.getByText("olivia@email.com")).toBeInTheDocument();
    expect(screen.getByText("+$1,999")).toBeInTheDocument();
  });

  it("calls toggleColorScheme when the theme button is clicked", () => {
    renderDashboard();

    // Grab the button by its title attribute
    const themeToggleButton = screen.getByTitle("Toggle color scheme");
    fireEvent.click(themeToggleButton);

    // Assert our mock function from vi.mock("@mantine/core") was triggered
    expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
  });
});