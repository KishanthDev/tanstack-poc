import {
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="default"
      onClick={() =>
        setColorScheme(colorScheme === "dark" ? "light" : "dark")
      }
    >
      {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
}