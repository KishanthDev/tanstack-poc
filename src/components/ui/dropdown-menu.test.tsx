import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
    it("opens the menu on trigger click and calls item action", () => {
        const onItemClick = jest.fn();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onItemClick}>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        const trigger = screen.getByText("Open");
        expect(screen.queryByText("Item 1")).not.toBeInTheDocument();

        fireEvent.click(trigger);

        const menuItem1 = screen.getByText("Item 1");
        expect(menuItem1).toBeInTheDocument();
        fireEvent.click(menuItem1);
        expect(onItemClick).toHaveBeenCalledTimes(1);
    });
});