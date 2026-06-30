import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import Navbar from "./Navbar";

// 1. Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// 2. Mock child components to isolate the Navbar tests
vi.mock("./Sidebar", () => ({
  default: () => <div data-testid="mock-sidebar">Sidebar Content</div>,
}));
vi.mock("../ThemeToggle", () => ({
  default: () => <button data-testid="mock-theme-toggle">Theme</button>,
}));

// 3. Mock window.matchMedia (Required by Mantine for testing)
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

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Spy on localStorage
    Storage.prototype.removeItem = vi.fn();
  });

  const renderNavbar = () => {
    return render(
      <MantineProvider>
        <Navbar />
      </MantineProvider>
    );
  };

  it("renders correctly with search and theme toggle", () => {
    renderNavbar();

    // Check for search input (Desktop)
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    
    // Check for child component mocks
    expect(screen.getByTestId("mock-theme-toggle")).toBeInTheDocument();
    
    // Check for the text logo
    expect(screen.getByText("POC")).toBeInTheDocument();
  });

  // Made this test async to await the dropdown render
  it("handles the logout flow correctly", async () => {
    renderNavbar();

    // 1. Find and click the Avatar to open the Dropdown Menu
    const avatar = screen.getByRole("img"); 
    fireEvent.click(avatar);

    // 2. Use findByText to WAIT for the menu to appear in the DOM
    const logoutMenuBtn = await screen.findByText("Logout");
    fireEvent.click(logoutMenuBtn);

    // 3. Verify localStorage was cleared
    expect(localStorage.removeItem).toHaveBeenCalledWith("isLoggedIn");

    // 4. Verify user was navigated to the home page
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

});