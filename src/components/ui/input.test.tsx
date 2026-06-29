import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
    it("renders an input element", () => {
        render(<Input data-testid="test-input" />);
        expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("allows user to type in it", () => {
        render(<Input data-testid="test-input" />);
        const input = screen.getByTestId("test-input") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "hello world" } });

        expect(input.value).toBe("hello world");
    });
});