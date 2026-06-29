import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./sheet";

describe("Sheet", () => {
    it("opens and closes the sheet", () => {
        render(
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        fireEvent.click(screen.getByText("Open"));
        expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    });
});