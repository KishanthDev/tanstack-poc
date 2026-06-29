import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("./Sidebar", () => () => <div>Sidebar</div>);

describe("Navbar", () => {
    const mockSetTheme = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useTheme as jest.Mock).mockReturnValue({
            setTheme: mockSetTheme,
        });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        jest.spyOn(window.localStorage.__proto__, 'removeItem');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the navbar with search and user controls", () => {
        render(<Navbar />);
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
        expect(screen.getByLabelText("My Account")).toBeInTheDocument();
    });

    it("opens the theme dropdown and allows changing themes", () => {
        render(<Navbar />);
        const themeButton = screen.getByRole("button", { name: /toggle theme/i });
        fireEvent.click(themeButton);

        const lightThemeItem = screen.getByText("Light");
        fireEvent.click(lightThemeItem);
        expect(mockSetTheme).toHaveBeenCalledWith("light");

        const darkThemeItem = screen.getByText("Dark");
        fireEvent.click(darkThemeItem);
        expect(mockSetTheme).toHaveBeenCalledWith("dark");

        const systemThemeItem = screen.getByText("System");
        fireEvent.click(systemThemeItem);
        expect(mockSetTheme).toHaveBeenCalledWith("system");
    });

    it("handles logout correctly", () => {
        render(<Navbar />);
        const avatarButton = screen.getByLabelText("My Account");
        fireEvent.click(avatarButton);

        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        expect(localStorage.removeItem).toHaveBeenCalledWith("isLoggedIn");
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("opens the mobile sidebar when menu button is clicked", () => {
        render(<Navbar />);
        const menuButton = screen.getByRole("button", { name: /toggle menu/i });

        // In the test environment, the sheet might not be visually hidden,
        // so we check for its content after the trigger is clicked.
        fireEvent.click(menuButton);
        expect(screen.getByText("Sidebar")).toBeInTheDocument();
    });
});