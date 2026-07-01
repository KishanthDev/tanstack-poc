import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  AlertCircle,
  Building2,
  Mail,
  Pencil,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";

import { User, useUserStore } from "../stores/userStore";

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=5"
  );

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};

const emptyUser: User = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  company: {
    name: "",
  },
};

export default function UsersPage() {
  const { users, setUsers, addUser, updateUser, deleteUser } =
    useUserStore();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (!users.length && data.length) {
      setUsers(data);
    }
  }, [data]);

  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<User>(emptyUser);

  const handleAdd = () => {
    setEditing(false);

    setForm({
      ...emptyUser,
      id: Date.now(),
    });

    open();
  };

  const handleEdit = (user: User) => {
    setEditing(true);
    setForm(user);
    open();
  };

  const handleSave = () => {
    if (editing) {
      updateUser(form);
    } else {
      addUser(form);
    }

    close();
  };

  if (isLoading)
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Users</Title>

        <Button leftSection={<Plus size={18} />} onClick={handleAdd}>
          Add User
        </Button>
      </Group>

      {error && (
        <Alert color="red" icon={<AlertCircle size={18} />} mb="lg">
          {(error as Error).message}
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {users.map((user) => (
          <Card key={user.id} shadow="sm" withBorder radius="md" p="lg">
            <Stack gap="sm">
              <Title order={4}>{user.name}</Title>

              <Group gap={6}>
                <Mail size={16} />
                <Text size="sm">{user.email}</Text>
              </Group>

              <Group gap={6}>
                <Phone size={16} />
                <Text size="sm">{user.phone}</Text>
              </Group>

              <Group gap={6}>
                <Building2 size={16} />
                <Text size="sm">{user.company.name}</Text>
              </Group>

              <Group justify="flex-end" mt="md">
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil size={16} />
                </ActionIcon>

                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => deleteUser(user.id)}
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        title={editing ? "Edit User" : "Add User"}
      >
        <Stack>
          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.currentTarget.value })
            }
          />

          <TextInput
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.currentTarget.value })
            }
          />

          <TextInput
            label="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.currentTarget.value })
            }
          />

          <TextInput
            label="Company"
            value={form.company.name}
            onChange={(e) =>
              setForm({
                ...form,
                company: {
                  name: e.currentTarget.value,
                },
              })
            }
          />

          <Button onClick={handleSave}>
            {editing ? "Update User" : "Create User"}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}