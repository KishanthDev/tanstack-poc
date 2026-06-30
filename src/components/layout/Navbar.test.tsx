import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

const mockNavigate = vi.fn();
const mockSetTheme = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
  }),
}));

vi.mock("./Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: any) => <div>{children}</div>,
  SheetTrigger: ({ children }: any) => <>{children}</>,
  SheetContent: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <>{children}</>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  DropdownMenuLabel: ({ children }: any) => <div>{children}</div>,
  DropdownMenuSeparator: () => <hr />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders search input", () => {
    render(<Navbar />);

    expect(
      screen.getByPlaceholderText("Search...")
    ).toBeInTheDocument();
  });

  it("renders mobile menu", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", { name: /toggle menu/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

it("renders notification button", () => {
  const { container } = render(<Navbar />);

  const bellIcon = container.querySelector(".lucide-bell");

  expect(bellIcon).toBeInTheDocument();
});

  it("changes theme to light", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    await user.click(screen.getByText("Light"));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("changes theme to dark", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    await user.click(screen.getByText("Dark"));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("changes theme to system", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    await user.click(screen.getByText("System"));

    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });

  it("renders account menu items", () => {
    render(<Navbar />);

    expect(screen.getByText("My Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("logs out and redirects to login", async () => {
    const user = userEvent.setup();

    localStorage.setItem("isLoggedIn", "true");

    render(<Navbar />);

    await user.click(screen.getByText("Logout"));

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders avatar fallback", () => {
    render(<Navbar />);

    expect(screen.getByText("CN")).toBeInTheDocument();
  });

  it("renders POC logo", () => {
    render(<Navbar />);

    expect(screen.getAllByText("POC")[0]).toBeInTheDocument();
  });
});