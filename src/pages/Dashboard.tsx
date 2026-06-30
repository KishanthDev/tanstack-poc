"use client";

import React from "react";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
} from "lucide-react";

import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    change: "+180.1% from last month",
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    icon: CreditCard,
  },
  {
    title: "Active Users",
    value: "+573",
    change: "+201 since last hour",
    icon: Activity,
  },
];

const sales = [
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
];

const chartData = [40, 70, 45, 90, 65, 55, 85, 100, 60, 80, 50, 75];

export default function Dashboard() {
  return (
    <Stack gap="lg">
      {/* Header */}

      <Group justify="space-between">
        <Title order={2}>Dashboard</Title>

        <Button leftSection={<Download size={16} />}>
          Download Report
        </Button>
      </Group>

      {/* Stats */}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.title} withBorder shadow="sm" radius="md">
            <Group justify="space-between" mb="xs">
              <Text fw={500} c="dimmed" size="sm">
                {stat.title}
              </Text>

              <ThemeIcon variant="light">
                <stat.icon size={18} />
              </ThemeIcon>
            </Group>

            <Title order={3}>{stat.value}</Title>

            <Text size="sm" c="dimmed" mt={6}>
              {stat.change}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {/* Bottom */}

      <Grid>
        {/* Overview */}

        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder shadow="sm" radius="md">
            <Title order={4}>Overview</Title>

            <Text c="dimmed" size="sm" mb="lg">
              Monthly revenue breakdown for 2024.
            </Text>

            <Flex align="flex-end" h={300} gap="xs">
              {chartData.map((height, index) => (
                <Paper
                  key={index}
                  radius="sm"
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    background: "var(--mantine-primary-color-filled)",
                    opacity: 0.25,
                    transition: "all .2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.opacity = ".25")
                  }
                />
              ))}
            </Flex>

            <Group justify="space-between" mt="md">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <Text key={m} size="xs" c="dimmed">
                  {m}
                </Text>
              ))}
            </Group>
          </Card>
        </Grid.Col>

        {/* Recent Sales */}

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card withBorder shadow="sm" radius="md">
            <Title order={4}>Recent Sales</Title>

            <Text c="dimmed" size="sm" mb="lg">
              You made 265 sales this month.
            </Text>

            <Stack gap="md">
              {sales.map((user) => (
                <React.Fragment key={user.email}>
                  <Group justify="space-between">
                    <Group>
                      <Avatar radius="xl">
                        {user.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </Avatar>

                      <div>
                        <Text fw={500}>{user.name}</Text>

                        <Text size="sm" c="dimmed">
                          {user.email}
                        </Text>
                      </div>
                    </Group>

                    <Text fw={700} c="green">
                      {user.amount}
                    </Text>
                  </Group>

                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}