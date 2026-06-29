"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import React from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-background">
            {/* Sidebar Wrapper */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r bg-background">
                <Sidebar />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col lg:pl-64">
                <Navbar />
                <main className="flex-1 p-5 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}