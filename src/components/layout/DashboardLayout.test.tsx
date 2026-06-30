import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./DashboardLayout";

vi.mock("../layouts/MainLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

describe("Dashboard", () => {
  it("renders inside MainLayout", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });

  it("renders dashboard header", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /download report/i })
    ).toBeInTheDocument();
  });

  it("renders all statistic cards", () => {
    render(<Dashboard />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Subscriptions")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();

    expect(screen.getByText("$45,231.89")).toBeInTheDocument();
    expect(screen.getByText("+2,350")).toBeInTheDocument();
    expect(screen.getByText("+12,234")).toBeInTheDocument();
    expect(screen.getByText("+573")).toBeInTheDocument();
  });

  it("renders overview section", () => {
    render(<Dashboard />);

    expect(screen.getByText("Overview")).toBeInTheDocument();

    expect(
      screen.getByText("Monthly revenue breakdown for 2024.")
    ).toBeInTheDocument();

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Dec")).toBeInTheDocument();
  });

  it("renders 12 month labels", () => {
    render(<Dashboard />);

    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });

  it("renders chart bars", () => {
    const { container } = render(<Dashboard />);

    const bars = container.querySelectorAll(
      ".bg-primary\\/20"
    );

    expect(bars).toHaveLength(12);
  });

  it("renders recent sales section", () => {
    render(<Dashboard />);

    expect(screen.getByText("Recent Sales")).toBeInTheDocument();

    expect(
      screen.getByText("You made 265 sales this month.")
    ).toBeInTheDocument();
  });

  it("renders all customer names", () => {
    render(<Dashboard />);

    [
      "Olivia Martin",
      "Jackson Lee",
      "Isabella Nguyen",
      "William Kim",
      "Sofia Davis",
    ].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders all customer emails", () => {
    render(<Dashboard />);

    [
      "olivia@email.com",
      "jackson@email.com",
      "isabella@email.com",
      "will@email.com",
      "sofia@email.com",
    ].forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it("renders all sales amounts", () => {
    render(<Dashboard />);

    ["+$1,999", "+$399", "+$299", "+$99", "+$39"].forEach(
      (amount) => {
        expect(screen.getByText(amount)).toBeInTheDocument();
      }
    );
  });

  it("renders avatar initials", () => {
    render(<Dashboard />);

    ["OM", "JL", "IN", "WK", "SD"].forEach((initials) => {
      expect(screen.getByText(initials)).toBeInTheDocument();
    });
  });
});