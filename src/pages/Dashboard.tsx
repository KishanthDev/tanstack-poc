"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  Search, 
  Bell, 
  CreditCard, 
  Activity,
  DollarSign,
  ArrowUpRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">UI</span>
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
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Analytics
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Customers
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile Menu Trigger Placeholder */}
            <Button variant="outline" size="icon" className="lg:hidden">
              <LayoutDashboard className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-muted/50 pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 space-y-6 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Download Report</Button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lower Section Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Chart Placeholder */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown for 2024.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-end justify-between px-4 pb-4 gap-2">
                  {/* Mock Bar Chart */}
                  {[40, 70, 45, 90, 65, 55, 85, 100, 60, 80, 50, 75].map((height, i) => (
                    <div key={i} className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-between px-4 text-xs text-muted-foreground">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                  <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales List */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: "Olivia Martin", email: "olivia.m@email.com", amount: "+$1,999.00" },
                    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                    { name: "Isabella Nguyen", email: "isabella.n@email.com", amount: "+$299.00" },
                    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="ml-auto font-medium text-green-600 dark:text-green-400">
                        {user.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}