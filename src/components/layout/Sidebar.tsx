"use client";

import {
    BarChart3,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Sidebar() {
    return (
        <aside className="flex h-full w-full flex-col bg-background">
            <div className="flex-1">
                <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm">UI</span>
                        </div>
                        Acme Corp
                    </div>
                </div>

                <nav className="flex flex-col gap-1 px-4 py-6">
                    <Button variant="secondary" className="justify-start gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <Users className="h-4 w-4" />
                        Customers
                    </Button>
                </nav>
            </div>
            <nav className="mt-auto flex flex-col gap-1 p-4 border-t">
                <Button variant="ghost" className="justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </nav>
        </aside>
    );
}