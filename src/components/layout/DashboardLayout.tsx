"use client";

import React from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  MoreHorizontal,
  Sun,
  Moon,
  Download
} from "lucide-react";
import {
  Card,
  Text,
  Title,
  Button,
  Avatar,
  Group,
  SimpleGrid,
  Grid,
  Stack,
  Box,
  Flex,
  ThemeIcon,
  Badge,
  ActionIcon,
  useMantineColorScheme,
  Menu,
  Divider,
} from "@mantine/core";

// DRY approach for stat cards
const STATS_DATA = [
  { title: "Total Revenue", value: "$45,231.89", diff: 20.1, icon: DollarSign, color: "blue" },
  { title: "Subscriptions", value: "2,350", diff: 18.2, icon: Users, color: "teal" },
  { title: "Sales", value: "12,234", diff: 19.0, icon: CreditCard, color: "violet" },
  { title: "Active Users", value: "573", diff: -4.5, icon: Activity, color: "orange" },
];

const RECENT_SALES = [
  { name: "Olivia Martin", email: "olivia@email.com", amount: "+$1,999", color: "blue" },
  { name: "Jackson Lee", email: "jackson@email.com", amount: "+$399", color: "cyan" },
  { name: "Isabella Nguyen", email: "isabella@email.com", amount: "+$299", color: "pink" },
  { name: "William Kim", email: "will@email.com", amount: "+$99", color: "orange" },
  { name: "Sofia Davis", email: "sofia@email.com", amount: "+$39", color: "grape" },
];

const CHART_DATA = [40, 70, 45, 90, 65, 55, 85, 100, 60, 80, 50, 75];
const CHART_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Dashboard() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <MainLayout>
      <Stack gap="xl">
        {/* Header with Theme Toggle */}
        <Group justify="space-between" align="center">
          <Box>
            <Title order={2} fw={800} lts={-0.5}>
              Dashboard
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Welcome back, here is what's happening today.
            </Text>
          </Box>
          <Group>
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </ActionIcon>
            <Button leftSection={<Download size={16} />} radius="md">
              Download Report
            </Button>
          </Group>
        </Group>

        {/* Highlight Stats */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {STATS_DATA.map((stat) => {
            const isPositive = stat.diff > 0;
            return (
              <Card key={stat.title} shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Text size="sm" fw={600} c="dimmed" tt="uppercase">
                      {stat.title}
                    </Text>
                    <Title order={3} mt="sm" fw={700}>
                      {stat.value}
                    </Title>
                  </Box>
                  <ThemeIcon variant="light" color={stat.color} size="xl" radius="md">
                    <stat.icon size={22} />
                  </ThemeIcon>
                </Group>
                
                <Group mt="lg" gap="xs">
                  <Badge 
                    variant="light" 
                    color={isPositive ? "teal" : "red"} 
                    size="md" 
                    radius="sm"
                  >
                    {isPositive ? "+" : ""}{stat.diff}%
                  </Badge>
                  <Text size="xs" c="dimmed">
                    vs last month
                  </Text>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        <Grid gap="lg">
          {/* Main Chart Area */}
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
              <Group justify="space-between" mb="xl">
                <Box>
                  <Title order={4} fw={700}>Revenue Overview</Title>
                  <Text size="sm" c="dimmed">Monthly revenue breakdown for 2024</Text>
                </Box>
                <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <MoreHorizontal size={20} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>Export as CSV</Menu.Item>
                    <Menu.Item>Export as PDF</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              {/* Custom Bar Chart adapted for Mantine Theme */}
              <Flex h={300} align="flex-end" gap="sm">
                {CHART_DATA.map((height, index) => (
                  <Box
                    key={index}
                    style={{
                      flex: 1,
                      height: `${height}%`,
                      backgroundColor: isDark 
                        ? "var(--mantine-color-blue-9)" 
                        : "var(--mantine-color-blue-1)",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-filled)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark 
                        ? "var(--mantine-color-blue-9)" 
                        : "var(--mantine-color-blue-1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  />
                ))}
              </Flex>

              <Group justify="space-between" mt="md" wrap="nowrap">
                {CHART_MONTHS.map((month) => (
                  <Text key={month} size="xs" c="dimmed" fw={500} style={{ flex: 1, textAlign: 'center' }}>
                    {month}
                  </Text>
                ))}
              </Group>
            </Card>
          </Grid.Col>

          {/* Recent Sales List */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
              <Box mb="xl">
                <Title order={4} fw={700}>Recent Sales</Title>
                <Text size="sm" c="dimmed">You made 265 sales this month.</Text>
              </Box>

              <Stack gap="sm">
                {RECENT_SALES.map((user, index) => (
                  <React.Fragment key={index}>
                    <Box
                      p="xs"
                      style={{
                        borderRadius: "var(--mantine-radius-md)",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: isDark ? "var(--mantine-color-dark-6)" : "var(--mantine-color-gray-0)",
                        }
                      }}
                    >
                      <Group wrap="nowrap">
                        <Avatar radius="xl" color={user.color} variant="light">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </Avatar>

                        <Box flex={1}>
                          <Text size="sm" fw={600}>
                            {user.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {user.email}
                          </Text>
                        </Box>

                        <Text fw={700} size="sm">
                          {user.amount}
                        </Text>
                      </Group>
                    </Box>
                    {index < RECENT_SALES.length - 1 && <Divider opacity={0.4} />}
                  </React.Fragment>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </MainLayout>
  );
}