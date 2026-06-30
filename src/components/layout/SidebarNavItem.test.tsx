import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { Home } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";

// 1. Mock window.matchMedia (Required by Mantine)
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

describe("SidebarNavItem Component", () => {
  // Helper function to render with required providers
  const renderNavItem = (props = {}) => {
    return render(
      <MantineProvider>
        <MemoryRouter>
          <SidebarNavItem label="Dashboard" to="/dashboard" icon={Home} {...props} />
        </MemoryRouter>
      </MantineProvider>
    );
  };

  it("renders the expanded state correctly with label text", () => {
    renderNavItem();

    // The text label should be directly in the document
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    // The component should render as a semantic link pointing to the correct route
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders the collapsed state correctly without direct label text", () => {
    renderNavItem({ collapsed: true });

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard");
    
    // In collapsed mode, the label is explicitly passed as `undefined` to the NavLink
    expect(link).not.toHaveTextContent("Dashboard");
  });

  it("displays a tooltip with the label on hover when collapsed", async () => {
    // Setup user event for realistic mouse interactions
    const user = userEvent.setup();
    
    renderNavItem({ collapsed: true });

    const link = screen.getByRole("link");

    // Simulate the user hovering over the icon
    await user.hover(link);

    // Mantine tooltips render in a portal asynchronously, so we must use `await findByText`
    // instead of `getByText` to give it a millisecond to appear in the DOM.
    const tooltipText = await screen.findByText("Dashboard");
    expect(tooltipText).toBeInTheDocument();
  });
});