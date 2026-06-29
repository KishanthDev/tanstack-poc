import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
    it("renders the dashboard header", () => {
        render(<Dashboard />);
        expect(screen.getByRole("heading", { name: /Dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Download Report/i })).toBeInTheDocument();
    });

    it("renders all the stat cards", () => {
        render(<Dashboard />);
        expect(screen.getByText("Total Revenue")).toBeInTheDocument();
        expect(screen.getByText("Subscriptions")).toBeInTheDocument();
        expect(screen.getByText("Sales")).toBeInTheDocument();
        expect(screen.getByText("Active Users")).toBeInTheDocument();
    });

    it("renders the overview and recent sales sections", () => {
        render(<Dashboard />);
        expect(screen.getByRole("heading", { name: /Overview/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Recent Sales/i })).toBeInTheDocument();
        expect(screen.getByText("You made 265 sales this month.")).toBeInTheDocument();
        expect(screen.getByText("Olivia Martin")).toBeInTheDocument();
    });
});