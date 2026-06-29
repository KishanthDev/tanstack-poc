import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthPage from "./login";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate,
}));

describe("AuthPage (Simple)", () => {
    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        mockedNavigate.mockClear();
    });

    it("renders login and sign up tabs correctly", () => {
        render(<MemoryRouter><AuthPage /></MemoryRouter>);
        expect(screen.getByRole("tab", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: "Sign Up" })).toBeInTheDocument();
        expect(screen.getByText("Welcome back! Please login to your account.")).toBeInTheDocument();
    });

    it("switches to sign up tab on click", () => {
        render(<MemoryRouter><AuthPage /></MemoryRouter>);
        fireEvent.click(screen.getByRole("tab", { name: "Sign Up" }));
        expect(screen.getByText("Enter your information to get started.")).toBeInTheDocument();
    });

    it("handles login form submission", async () => {
        jest.useFakeTimers();
        render(<MemoryRouter><AuthPage /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });

        const signInButton = screen.getByRole("button", { name: /Sign In/i });
        fireEvent.click(signInButton);

        // Check loading state
        expect(signInButton).toBeDisabled();
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument(); // Assuming a test-id for the spinner

        // Wait for submission logic to complete
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith("isLoggedIn", "true");
        });

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
        });

        jest.useRealTimers();
    });
});