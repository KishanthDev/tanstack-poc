"use client";

import {
    LayoutDashboard,
    PanelLeftClose,
    PanelRightClose,
    Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarProps {
    isCollapsed?: boolean;
    toggleSidebar?: () => void;
}

export default function Sidebar({ isCollapsed = false, toggleSidebar }: SidebarProps) {
    return (
        <aside className="flex h-full w-full flex-col bg-background">
            <div className="flex-1">
                <div className={cn("flex h-16 items-center border-b", isCollapsed ? "justify-center px-2" : "justify-between px-6")}>
                    <div className={cn("flex items-center gap-2 font-bold text-xl tracking-tight", isCollapsed && "hidden")}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm">UI</span>
                        </div>
                        POC
                    </div>
                    {toggleSidebar && (
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden lg:flex">
                            {isCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                            <span className="sr-only">Toggle sidebar</span>
                        </Button>
                    )}
                </div>

                <nav className="flex flex-col gap-1 px-4 py-6">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="secondary" className={cn("w-full justify-start gap-2", isCollapsed && "justify-center")}>
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span className={cn(isCollapsed && "hidden")}>Overview</span>
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    Overview
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </div>
            <nav className="mt-auto flex flex-col gap-1 p-4 border-t">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" className={cn("w-full justify-start gap-2", isCollapsed && "justify-center")}>
                                <Settings className="h-4 w-4" />
                                <span className={cn(isCollapsed && "hidden")}>Settings</span>
                            </Button>
                        </TooltipTrigger>
                        {isCollapsed && (
                            <TooltipContent side="right">
                                Settings
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}