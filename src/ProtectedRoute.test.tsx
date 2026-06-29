import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const ProtectedComponent = () => <div>Protected Content</div>;
const PublicComponent = () => <div>Public Page</div>;

describe("ProtectedRoute", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("renders children when user is logged in", () => {
        localStorage.setItem("isLoggedIn", "true");
        const { getByText } = render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route path="/protected" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
                </Routes>
            </MemoryRouter>
        );
        expect(getByText("Protected Content")).toBeInTheDocument();
    });

    it("redirects to home page when user is not logged in", () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/protected"]}><Routes><Route path="/" element={<PublicComponent />} /><Route path="/protected" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} /></Routes></MemoryRouter>
        );
        expect(getByText("Public Page")).toBeInTheDocument();
    });
});