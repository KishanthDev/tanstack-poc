import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import Sidebar from "./Sidebar";

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

// 2. Mock SidebarNavItem to isolate the Sidebar tests
vi.mock("./SidebarNavItem", () => ({
  default: ({ label, collapsed }: { label: string; collapsed: boolean }) => (
    <div data-testid={`nav-item-${label.toLowerCase()}`} data-collapsed={collapsed}>
      Mock {label}
    </div>
  ),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSidebar = (props = {}) => {
    return render(
      <MantineProvider>
        <Sidebar {...props} />
      </MantineProvider>
    );
  };

  it("renders the expanded state correctly by default", () => {
    renderSidebar();

    // 1. Check for Logo/Title (rendered when NOT collapsed)
    expect(screen.getByText("POC")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();

    // 2. Check that the menu item rendered and received collapsed=false
    const dashboardItem = screen.getByTestId("nav-item-dashboard");
    expect(dashboardItem).toBeInTheDocument();
    expect(dashboardItem).toHaveAttribute("data-collapsed", "false");

    // 3. Check for Settings link text
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders the collapsed state correctly when isCollapsed is true", () => {
    renderSidebar({ isCollapsed: true });

    // 1. Title/Logo should NOT be in the document
    expect(screen.queryByText("POC")).not.toBeInTheDocument();
    expect(screen.queryByText("UI")).not.toBeInTheDocument();

    // 2. Check that the menu item received collapsed=true
    const dashboardItem = screen.getByTestId("nav-item-dashboard");
    expect(dashboardItem).toHaveAttribute("data-collapsed", "true");
  });

  it("calls toggleSidebar when the toggle button is clicked", () => {
    const mockToggleSidebar = vi.fn();
    const { container } = renderSidebar({ toggleSidebar: mockToggleSidebar });

    // The ActionIcon doesn't have an aria-label in the component, so we grab it via its Mantine class
    // using the container to avoid Testing Library throwing an "element not found" error on roles.
    const toggleButton = container.querySelector(".mantine-ActionIcon-root");
    
    expect(toggleButton).toBeInTheDocument();
    
    // Simulate a click on the button
    fireEvent.click(toggleButton!);

    // Verify our mock function was triggered
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("does not render the toggle button if toggleSidebar prop is not provided", () => {
    const { container } = renderSidebar(); // No toggleSidebar prop passed

    const toggleButton = container.querySelector(".mantine-ActionIcon-root");
    
    expect(toggleButton).not.toBeInTheDocument();
  });
});