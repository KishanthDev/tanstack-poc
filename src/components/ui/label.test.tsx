import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
    it("renders a label with its text", () => {
        render(<Label>Username</Label>);
        const labelElement = screen.getByText("Username");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement.tagName).toBe("LABEL");
    });
});