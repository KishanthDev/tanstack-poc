import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

describe("Tooltip", () => {
    it("shows tooltip content on hover", async () => {
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>Hover me</TooltipTrigger>
                    <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );

        fireEvent.mouseOver(screen.getByText("Hover me"));

        const tooltipContent = await screen.findByText("Tooltip content");
        expect(tooltipContent).toBeInTheDocument();
    });
});