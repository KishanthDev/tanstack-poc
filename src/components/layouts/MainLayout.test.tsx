import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainLayout from "./MainLayout";

vi.mock("@/components/layout/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/layout/Sidebar", () => ({
  default: ({
    isCollapsed,
    toggleSidebar,
  }: {
    isCollapsed: boolean;
    toggleSidebar: () => void;
  }) => (
    <div data-testid="sidebar">
      <span>{isCollapsed ? "Collapsed" : "Expanded"}</span>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  ),
}));

describe("MainLayout", () => {
  it("renders navbar", () => {
    render(
      <MainLayout>
        <div>Dashboard Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders sidebar", () => {
    render(
      <MainLayout>
        <div>Dashboard Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <MainLayout>
        <div>Dashboard Content</div>
      </MainLayout>
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });

  it("sidebar is expanded by default", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByText("Expanded")).toBeInTheDocument();
  });

  it("toggles sidebar state", async () => {
    const user = userEvent.setup();

    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    await user.click(
      screen.getByRole("button", {
        name: /toggle sidebar/i,
      })
    );

    expect(screen.getByText("Collapsed")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /toggle sidebar/i,
      })
    );

    expect(screen.getByText("Expanded")).toBeInTheDocument();
  });

  it("updates layout classes when sidebar is collapsed", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const wrappers = container.querySelectorAll("div");

    expect(
      wrappers[1].className
    ).toContain("lg:w-64");

    await user.click(
      screen.getByRole("button", {
        name: /toggle sidebar/i,
      })
    );

    expect(
      wrappers[1].className
    ).toContain("lg:w-20");
  });
});