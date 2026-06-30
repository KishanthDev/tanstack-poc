"use client";

import {
    LayoutDashboard,
    PanelLeftClose,
    PanelRightClose,
    Settings,
} from "lucide-react";
import {
    ActionIcon,
    Box,
    Divider,
    Flex,
    Group,
    NavLink as MantineNavLink,
    Stack,
    Text,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
} from "@mantine/core";
import SidebarNavItem from "./SidebarNavItem";
interface SidebarProps {
    isCollapsed?: boolean;
    toggleSidebar?: () => void;
}

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
];

export default function Sidebar({
    isCollapsed = false,
    toggleSidebar,
}: SidebarProps) {
    return (
        <Flex
            direction="column"
            h="100%"
            bg="var(--mantine-color-body)"
        >
            {/* Header */}
            <Box p="md">
                <Group justify={isCollapsed ? "center" : "space-between"}>
                    {!isCollapsed && (
                        <Group gap="sm">
                            <ThemeIcon size="lg" radius="md">
                                UI
                            </ThemeIcon>

                            <Text fw={700} size="lg">
                                POC
                            </Text>
                        </Group>
                    )}

                    {toggleSidebar && (
                        <ActionIcon
                            variant="subtle"
                            onClick={toggleSidebar}
                            visibleFrom="lg"
                        >
                            {isCollapsed ? (
                                <PanelRightClose size={18} />
                            ) : (
                                <PanelLeftClose size={18} />
                            )}
                        </ActionIcon>
                    )}
                </Group>
            </Box>

            <Divider />

            {/* Menu */}
            <Stack gap={4} p="sm" flex={1}>
                {menuItems.map((item) => (
                    <SidebarNavItem
                        key={item.href}
                        label={item.title}
                        to={item.href}
                        icon={item.icon}
                        collapsed={isCollapsed}
                    />
                ))}
            </Stack>

            <Divider />

            {/* Bottom */}
            <Box p="sm">
                {isCollapsed ? (
                    <Tooltip label="Settings" position="right">
                        <UnstyledButton>
                            <MantineNavLink
                                leftSection={<Settings size={18} />}
                            />
                        </UnstyledButton>
                    </Tooltip>
                ) : (
                    <MantineNavLink
                        label="Settings"
                        leftSection={<Settings size={18} />}
                    />
                )}
            </Box>
        </Flex>
    );
}