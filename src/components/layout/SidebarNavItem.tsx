import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, MantineComponent, NavLink, Tooltip } from "@mantine/core";
import { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  label: string;
  to: string;
  icon: LucideIcon;
  collapsed?: boolean;
}

export default function SidebarNavItem({
  label,
  to,
  icon: Icon,
  collapsed = false,
}: SidebarNavItemProps) {
  const link = (
    <NavLink
      component={RouterNavLink}
      to={to}
      label={!collapsed ? label : undefined}
      leftSection={<Icon size={18} />}
      variant="filled"
    />
  );

  if (collapsed) {
    return (
      <Tooltip label={label} position="right">
        <Box>{link}</Box>
      </Tooltip>
    );
  }

  return link;
}