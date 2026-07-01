import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, NavLink, Tooltip } from "@mantine/core";
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
      label={collapsed ? undefined : label}
      leftSection={<Icon size={18} />}
      variant="filled"
      styles={{
        root: {
          width: collapsed ? 44 : "100%",
          height: 44,
          margin: collapsed ? "0 auto" : 0,
          padding: collapsed ? 0 : "8px 12px",
          justifyContent: collapsed ? "center" : "flex-start",
        },
        body: {
          display: collapsed ? "none" : "block",
        },
        section: {
          marginInlineEnd: collapsed ? 0 : 10,
        },
      }}
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