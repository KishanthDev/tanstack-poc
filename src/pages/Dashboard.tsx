"use client";

import React from "react";
import {
    Activity,
    CreditCard,
    DollarSign,
    Users,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h2>

                <Button>Download Report</Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>

                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            $45,231.89
                        </div>

                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Subscriptions
                        </CardTitle>

                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            +2,350
                        </div>

                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sales
                        </CardTitle>

                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            +12,234
                        </div>

                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Users
                        </CardTitle>

                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            +573
                        </div>

                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid gap-4 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>

                        <CardDescription>
                            Monthly revenue breakdown for 2024.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex h-[300px] items-end gap-2">
                            {[40, 70, 45, 90, 65, 55, 85, 100, 60, 80, 50, 75].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="w-full rounded-t bg-primary/20 transition-colors hover:bg-primary"
                                        style={{ height: `${height}%` }}
                                    />
                                )
                            )}
                        </div>

                        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Sales */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>

                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-6">
                            {[
                                {
                                    name: "Olivia Martin",
                                    email: "olivia@email.com",
                                    amount: "+$1,999",
                                },
                                {
                                    name: "Jackson Lee",
                                    email: "jackson@email.com",
                                    amount: "+$399",
                                },
                                {
                                    name: "Isabella Nguyen",
                                    email: "isabella@email.com",
                                    amount: "+$299",
                                },
                                {
                                    name: "William Kim",
                                    email: "will@email.com",
                                    amount: "+$99",
                                },
                                {
                                    name: "Sofia Davis",
                                    email: "sofia@email.com",
                                    amount: "+$39",
                                },
                            ].map((user, index) => (
                                <div
                                    key={index}
                                    className="flex items-center"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="ml-4">
                                        <p className="text-sm font-medium">
                                            {user.name}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
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
    );
}