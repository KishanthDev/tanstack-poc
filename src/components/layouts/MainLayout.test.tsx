import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MainLayout from "./MainLayout"; // Adjust path if necessary

// 1. Mock the child components to isolate the layout logic
vi.mock("@/components/layout/Navbar", () => ({
  default: () => <div data-testid="mock-navbar">Navbar Content</div>,
}));

vi.mock("@/components/layout/Sidebar", () => ({
  default: ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void }) => (
    <div data-testid="mock-sidebar" data-collapsed={isCollapsed}>
      <button data-testid="toggle-sidebar-btn" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
    </div>
  ),
}));

// Mock the cn utility just in case it has external dependencies, 
// though usually tailwind-merge/clsx runs fine in JSDOM.
vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    // A simple fallback if the real `cn` fails in test environment, 
    // otherwise we let the real one run to process tailwind classes accurately.
    cn: actual.cn || ((...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ")),
  };
});

describe("MainLayout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLayout = () => {
    return render(
      <MainLayout>
        <div data-testid="mock-children">Main Content Area</div>
      </MainLayout>
    );
  };

  it("renders the layout with children, Navbar, and Sidebar", () => {
    renderLayout();

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-children")).toBeInTheDocument();
  });

  it("applies the expanded layout classes by default", () => {
    renderLayout();

    const sidebar = screen.getByTestId("mock-sidebar");
    const navbar = screen.getByTestId("mock-navbar");

    // The state passed to the Sidebar component should be false by default
    expect(sidebar).toHaveAttribute("data-collapsed", "false");

    // Verify the parent wrappers have the correct expanded Tailwind classes
    const sidebarWrapper = sidebar.parentElement;
    const mainWrapper = navbar.parentElement;

    expect(sidebarWrapper).toHaveClass("lg:w-64");
    expect(sidebarWrapper).not.toHaveClass("lg:w-20");

    expect(mainWrapper).toHaveClass("lg:pl-64");
    expect(mainWrapper).not.toHaveClass("lg:pl-20");
  });

  it("updates the layout classes when the sidebar is toggled", () => {
    renderLayout();

    const sidebar = screen.getByTestId("mock-sidebar");
    const navbar = screen.getByTestId("mock-navbar");
    const toggleButton = screen.getByTestId("toggle-sidebar-btn");

    const sidebarWrapper = sidebar.parentElement;
    const mainWrapper = navbar.parentElement;

    // Trigger the toggle function passed down to the Sidebar
    fireEvent.click(toggleButton);

    // Verify the state passed to the Sidebar component updated
    expect(sidebar).toHaveAttribute("data-collapsed", "true");

    // Verify the parent wrappers updated to the collapsed Tailwind classes
    expect(sidebarWrapper).toHaveClass("lg:w-20");
    expect(sidebarWrapper).not.toHaveClass("lg:w-64");

    expect(mainWrapper).toHaveClass("lg:pl-20");
    expect(mainWrapper).not.toHaveClass("lg:pl-64");
  });
});