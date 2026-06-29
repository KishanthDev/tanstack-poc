import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import React from "react";

// Mock child components to isolate the App component tests
jest.mock("./pages/Login", () => () => <div>Login Page</div>);
jest.mock("./pages/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("./components/layouts/MainLayout", () => ({ children }: { children: React.ReactNode }) => (
    <div>Main Layout<div>{children}</div></div>
));

describe("App Routing", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("renders the login page for the root route", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("redirects to login page when trying to access dashboard without being logged in", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <App />
            </MemoryRouter>
        );
        // ProtectedRoute redirects to "/", which renders the mocked Login page
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("renders the dashboard page when logged in", () => {
        localStorage.setItem("isLoggedIn", "true");
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
        expect(screen.getByText("Main Layout")).toBeInTheDocument();
    });
});