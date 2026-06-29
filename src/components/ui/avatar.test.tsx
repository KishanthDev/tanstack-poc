import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import React from "react";

describe("Avatar", () => {
    it("renders an avatar with an image", () => {
        render(
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        );
        expect(screen.getByRole("img", { name: "@shadcn" })).toBeInTheDocument();
    });

    it("renders the fallback when image fails to load", () => {
        render(
            <Avatar>
                <AvatarImage src="non-existent-image.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        );
        expect(screen.getByText("CN")).toBeInTheDocument();
    });
});