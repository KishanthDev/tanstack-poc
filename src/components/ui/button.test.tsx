import React from "react";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

describe("Button", () => {
    it("renders a button with children", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("applies default variant and size classes", () => {
        render(<Button>Default</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(cn(buttonVariants({ variant: "default", size: "default" })));
    });

    it("applies specified variant and size classes", () => {
        render(<Button variant="destructive" size="lg">Destructive LG</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(cn(buttonVariants({ variant: "destructive", size: "lg" })));
    });

    it("renders as a child component when asChild is true", () => {
        render(<Button asChild><a href="/">Link</a></Button>);
        const link = screen.getByRole("link", { name: /link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(cn(buttonVariants()));
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("is disabled when the disabled prop is passed", () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:opacity-50");
    });
});