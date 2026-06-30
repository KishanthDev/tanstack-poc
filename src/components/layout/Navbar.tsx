"use client";

import {
  Bell,
  LogOut,
  Menu,
  Search,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Group,
  Indicator,
  Menu as MantineMenu,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Sidebar from "./Sidebar";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <>
      <Box
        component="header"
        h={60}
        style={{
          background: "var(--mantine-color-body)",
          borderBottom: "1px solid var(--mantine-color-default-border)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          {/* Mobile */}

          <Group hiddenFrom="lg">
            <Burger
              opened={opened}
              onClick={open}
              size="sm"
            />

            <Text fw={700} size="lg">
              POC
            </Text>
          </Group>

          {/* Desktop Search */}

          <TextInput
            visibleFrom="lg"
            leftSection={<Search size={16} />}
            placeholder="Search..."
            w={400}
          />

          {/* Right */}

          <Group gap="sm">
            <ThemeToggle />

            <Indicator inline color="red" size={8}>
              <ActionIcon variant="subtle" size="lg">
                <Bell size={18} />
              </ActionIcon>
            </Indicator>

            <MantineMenu shadow="md" width={220} position="bottom-end">
              <MantineMenu.Target>
                <Avatar
                  src="https://github.com/shadcn.png"
                  radius="xl"
                  style={{ cursor: "pointer" }}
                />
              </MantineMenu.Target>

              <MantineMenu.Dropdown>
                <MantineMenu.Label>
                  My Account
                </MantineMenu.Label>

                <MantineMenu.Item
                  leftSection={<User size={16} />}
                >
                  Profile
                </MantineMenu.Item>

                <MantineMenu.Divider />

                <MantineMenu.Item
                  color="red"
                  leftSection={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </MantineMenu.Item>
              </MantineMenu.Dropdown>
            </MantineMenu>
          </Group>
        </Group>
      </Box>

      {/* Mobile Sidebar */}

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        padding={0}
        size={280}
        title={null}
      >
        <Stack h="100%">
          <Sidebar />
        </Stack>
      </Modal>
    </>
  );
}