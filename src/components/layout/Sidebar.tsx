"use client";

import {
    LayoutDashboard,
    Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };
    return (
        <aside className="flex h-full w-full flex-col bg-background">
            <div className="flex-1">
                <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm">UI</span>
                        </div>
                        POC
                    </div>
                </div>

                <nav className="flex flex-col gap-1 px-4 py-6">
                    <Button variant="secondary" className="justify-start gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Button>
                </nav>
            </div>
            <nav className="mt-auto flex flex-col gap-1 p-4 border-t">
                <Button variant="ghost" className="justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
            </nav>
        </aside>
    );
}