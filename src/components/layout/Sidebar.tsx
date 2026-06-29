"use client";

import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm text-primary-foreground">UI</span>
          </div>
          Acme Corp
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-4 py-6">
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

        <Button variant="ghost" className="justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  );
}