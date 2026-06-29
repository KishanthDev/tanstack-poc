"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="min-h-screen w-full bg-background">
            {/* Sidebar Wrapper */}
            <div className={cn("hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col border-r bg-background transition-all duration-300", isSidebarCollapsed ? "lg:w-20" : "lg:w-64")}>
                <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content Wrapper */}
            <div className={cn("flex flex-col transition-all duration-300", isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64")}>
                <Navbar />
                <main className="flex-1 p-5 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}