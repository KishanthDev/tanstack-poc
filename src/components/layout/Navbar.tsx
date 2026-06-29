"use client";

import React from "react";
import { Search, Bell, Menu, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "./Sidebar"; 
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { setTheme } = useTheme();

    return (
        <header className="flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-40">
            {/* Mobile Menu */}
            <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        {/* Required for screen readers so the Sheet opens correctly */}
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <div className="font-bold text-lg lg:hidden">Acme Corp</div>
            </div>

            {/* Desktop Search & Controls */}
            <div className="flex w-full items-center justify-end lg:justify-between space-x-2 md:space-x-4">
                <div className="hidden lg:flex w-full max-w-sm items-center relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-muted/50 pl-8 md:w-[300px] lg:w-[400px]"
                    />
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
                    </Button>
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}