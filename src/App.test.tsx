import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("./pages/Login", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("./pages/Dashboard", () => ({
  default: () => <div>Dashboard Page</div>,
}));

vi.mock("./components/layouts/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

vi.mock("./ProtectedRoute", () => ({
  default: ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      <>{children}</>
    ) : (
      <div>Redirected to Login</div>
    );
  },
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders login page for root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("blocks dashboard when user is not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Redirected to Login")
    ).toBeInTheDocument();
  });

  it("renders dashboard when logged in", () => {
    localStorage.setItem("isLoggedIn", "true");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  it("wraps dashboard inside MainLayout", () => {
    localStorage.setItem("isLoggedIn", "true");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    const layout = screen.getByTestId("main-layout");

    expect(layout).toContainElement(
      screen.getByText("Dashboard Page")
    );
  });

  it("does not render login page on dashboard route", () => {
    localStorage.setItem("isLoggedIn", "true");

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.queryByText("Login Page")
    ).not.toBeInTheDocument();
  });
});