"use client";

import { useState } from "react";
import { 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Tabs, 
  Text, 
  Title, 
  Stack, 
  Group, 
  Divider, 
  ActionIcon, 
  useMantineColorScheme, 
  ThemeIcon,
  rem 
} from "@mantine/core";
import { Mail, ArrowRight, Sparkles, Sun, Moon } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
      localStorage.setItem("isLoggedIn","true")
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "var(--mantine-color-gray-0)",
      padding: rem(20)
    }}>
      {/* Ambient background remains via CSS or Mantine Box */}
      <Paper 
        radius="xl" 
        shadow="xl" 
        withBorder 
        p={0} 
        style={{ 
          maxWidth: rem(1000), 
          width: "100%", 
          overflow: "hidden",
          display: "flex" 
        }}
      >
        {/* Left Side: Branding */}
        <Stack 
          justify="space-between" 
          p={48} 
          bg={isDark ? "dark.8" : "gray.1"} 
          style={{ width: "50%", display: "flex" }}
          visibleFrom="lg"
        >
          <Group gap="sm">
            <ThemeIcon size={40} radius="md" variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
              <Sparkles size={20} />
            </ThemeIcon>
            <Text fw={600} size="xl">Acme Studio</Text>
          </Group>

          <Stack gap="md">
            <Title order={2} fw={300}>
              Crafting digital <br />
              <Text span fw={600} variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
                masterpieces.
              </Text>
            </Title>
            <Text c="dimmed" size="sm">
              Log in to access your bespoke dashboard, manage ongoing projects, and refine your vision with our premium toolset.
            </Text>
          </Stack>
        </Stack>

        {/* Right Side: Form */}
        <Stack p={48} style={{ width: "100%", maxWidth: rem(500) }}>
          <Group justify="flex-end">
            <ActionIcon onClick={() => toggleColorScheme()} variant="subtle" size="lg">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </ActionIcon>
          </Group>

          <Tabs defaultValue="login" radius="xl">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="login">Login</Tabs.Tab>
              <Tabs.Tab value="signup">Register</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login">
              <Stack gap="md">
                <Title order={3}>Welcome back</Title>
                <form onSubmit={onSubmit}>
                  <Stack gap="md">
                    <TextInput label="Email" placeholder="hello@example.com" required size="md" radius="md" />
                    <PasswordInput label="Password" placeholder="••••••••" required size="md" radius="md" />
                    <Button type="submit" loading={isLoading} fullWidth radius="md" size="md" mt="sm">
                      Sign In <ArrowRight size={16} style={{ marginLeft: 8 }} />
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="signup">
              <Stack gap="md">
                <Title order={3}>Create an account</Title>
                <form onSubmit={onSubmit}>
                  <Stack gap="md">
                    <TextInput label="Email" placeholder="hello@example.com" required size="md" radius="md" />
                    <PasswordInput label="Password" placeholder="Create a strong password" required size="md" radius="md" />
                    <Button type="submit" loading={isLoading} fullWidth radius="md" size="md" mt="sm" variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
                      Create Account
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Tabs.Panel>
          </Tabs>

          <Divider label="Or continue with" labelPosition="center" my="md" />
          
          <Group grow>
            <Button variant="default" radius="md">Google</Button>
            <Button variant="default" radius="md">Facebook</Button>
          </Group>
        </Stack>
      </Paper>
    </div>
  );
}