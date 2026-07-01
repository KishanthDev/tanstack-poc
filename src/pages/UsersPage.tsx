import { useQuery } from "@tanstack/react-query";
import {
    Alert,
    Card,
    Center,
    Container,
    Group,
    Loader,
    Stack,
    Text,
    Title,
    SimpleGrid
} from "@mantine/core";
import {
    AlertCircle,
    Building2,
    Mail,
    Phone,
} from "lucide-react";
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
    };
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?_limit=5"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
};

const UsersPage = () => {

    const {
        data: users = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    if (isLoading) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <Container size="sm" py="xl">
            <Title order={2} mb="lg">
                Users
            </Title>

            {error && (
                <Alert
                    icon={<AlertCircle size={16} />}
                    color="red"
                    mb="md"
                >
                    {(error as Error).message}
                </Alert>
            )}

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="md"
                verticalSpacing="md"
            >
                {users.map((user) => (
                    <Card key={user.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={4} mb="md">
                            {user.name}
                        </Title>

                        <Stack gap="sm">
                            <Group gap="xs">
                                <Mail size={16} />
                                <Text size="sm">{user.email}</Text>
                            </Group>

                            <Group gap="xs">
                                <Phone size={16} />
                                <Text size="sm">{user.phone}</Text>
                            </Group>

                            <Group gap="xs">
                                <Building2 size={16} />
                                <Text size="sm">{user.company.name}</Text>
                            </Group>
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default UsersPage;