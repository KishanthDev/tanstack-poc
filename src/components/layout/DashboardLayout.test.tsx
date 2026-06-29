import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./DashboardLayout";

jest.mock("../layouts/MainLayout", () => ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
));

describe("DashboardLayout", () => {
    it("renders the dashboard content inside MainLayout", () => {
        render(<Dashboard />);

        expect(screen.getByTestId("main-layout")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Dashboard/i })).toBeInTheDocument();
        expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    });
});