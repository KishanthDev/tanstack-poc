import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import AuthPage from "./AuthPage";

// 1. Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), 
    removeListener: vi.fn(), 
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 2. Mock useMantineColorScheme
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

describe("AuthPage Component", () => {
  const originalLocation = window.location;

  beforeAll(() => {
    // Safely mock window.location using Object.defineProperty to satisfy TypeScript
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: { href: '' },
      writable: true,
    });
  });

  afterAll(() => {
    // Restore original location
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalLocation,
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    Storage.prototype.setItem = vi.fn();
    window.location.href = "";
  });

  afterEach(() => {
    // Ensure timers are always reset after tests run
    vi.useRealTimers();
  });

  const renderAuthPage = () => {
    return render(
      <MantineProvider>
        <AuthPage />
      </MantineProvider>
    );
  };

  it("renders the branding and default login form", () => {
    renderAuthPage();

    expect(screen.getByText("Acme Studio")).toBeInTheDocument();
    expect(screen.getByText(/Crafting digital/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Welcome back", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  });

  it("switches to the signup form when the Register tab is clicked", () => {
    renderAuthPage();

    // Use fireEvent instead of userEvent to avoid hanging on fake timer issues
    const registerTab = screen.getByRole("tab", { name: "Register" });
    fireEvent.click(registerTab);

    // Mantine tab changes are synchronous in JSDOM when using fireEvent
    expect(screen.getByRole("heading", { name: "Create an account", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  it("calls toggleColorScheme when the theme button is clicked", () => {
    const { container } = renderAuthPage();

    const themeButton = container.querySelector('.mantine-ActionIcon-root');
    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton!);
    expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
  });

  it("handles the submission flow: loading state, local storage, and redirect", () => {
    // ONLY use fake timers in the exact test that needs it
    vi.useFakeTimers();
    renderAuthPage();

    // 1. Target inputs using placeholders to avoid issues with Mantine's required "*" label text
    const emailInputs = screen.getAllByPlaceholderText("hello@example.com");
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    
    // We use index [0] to grab the inputs currently in the "Login" tab
    fireEvent.change(emailInputs[0], { target: { value: "test@example.com" } });
    fireEvent.change(passwordInputs[0], { target: { value: "password123" } });

    // 2. Submit the form
    const submitBtn = screen.getByRole("button", { name: /Sign In/i });
    const form = submitBtn.closest("form");
    fireEvent.submit(form!);

    // 3. Verify loading state is active
    expect(submitBtn).toHaveAttribute("data-loading");

    // 4. Fast-forward time
    vi.advanceTimersByTime(2000);

    // 5. Verify the side-effects of the timeout
    expect(localStorage.setItem).toHaveBeenCalledWith("isLoggedIn", "true");
    expect(window.location.href).toBe("/dashboard");
  });
});