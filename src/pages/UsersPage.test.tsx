import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import UsersPage from "./UsersPage";

// 1. Mock window.matchMedia (Required by Mantine)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 2. Mock Zustand User Store
const mockSetUsers = vi.fn();
const mockAddUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockDeleteUser = vi.fn();

// We create a mutable mock store object so we can change 'users' per test
const mockStore = {
  users: [] as any[],
  setUsers: mockSetUsers,
  addUser: mockAddUser,
  updateUser: mockUpdateUser,
  deleteUser: mockDeleteUser,
};

vi.mock("../stores/userStore", () => ({
  useUserStore: () => mockStore,
}));

// 3. Mock React Query
const mockUseQuery = vi.fn();
vi.mock("@tanstack/react-query", () => ({
  useQuery: () => mockUseQuery(),
}));

describe("UsersPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset store state to defaults before each test
    mockStore.users = [];
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  const renderUsersPage = () => {
    return render(
      <MantineProvider>
        <UsersPage />
      </MantineProvider>
    );
  };

  it("shows a loader when data is fetching", () => {
    mockUseQuery.mockReturnValue({ isLoading: true });
    
    const { container } = renderUsersPage();
    
    expect(container.querySelector('.mantine-Loader-root')).toBeInTheDocument();
  });

  it("displays an error alert if the query fails", () => {
    mockUseQuery.mockReturnValue({ 
      isLoading: false, 
      error: new Error("Failed to load network resources") 
    });
    
    renderUsersPage();
    
    expect(screen.getByText("Failed to load network resources")).toBeInTheDocument();
  });

  it("populates the store via useEffect when data is fetched", () => {
    const fetchedUsers = [{ id: 1, name: "John Doe" }];
    
    mockUseQuery.mockReturnValue({ 
      isLoading: false, 
      data: fetchedUsers 
    });

    renderUsersPage();

    expect(mockSetUsers).toHaveBeenCalledWith(fetchedUsers);
  });

  it("renders a grid of user cards from the store", () => {
    mockStore.users = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "555-1234",
        company: { name: "Tech Corp" }
      }
    ];

    renderUsersPage();

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("555-1234")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
  });

  it("opens the Add User modal and calls addUser on save", async () => {
    const user = userEvent.setup();
    renderUsersPage();

    // Click "Add User" header button
    await user.click(screen.getByRole("button", { name: /add user/i }));

    // FIX: Use findByRole to wait for Mantine's modal to mount via portal
    const modal = await screen.findByRole("dialog", { name: "Add User" });
    expect(modal).toBeInTheDocument();

    // Fill out the form
    await user.type(screen.getByLabelText("Name"), "Bob Smith");
    await user.type(screen.getByLabelText("Email"), "bob@example.com");
    await user.type(screen.getByLabelText("Company"), "Bob LLC");

    // Click Save
    await user.click(screen.getByRole("button", { name: "Create User" }));

    // Verify the Zustand action was triggered with the form payload
    expect(mockAddUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Bob Smith",
        email: "bob@example.com",
        company: { name: "Bob LLC" },
        id: expect.any(Number), 
      })
    );
  });

  it("opens the Edit User modal and calls updateUser on save", async () => {
    const user = userEvent.setup();
    mockStore.users = [
      { id: 99, name: "Old Name", email: "old@mail.com", phone: "", company: { name: "" } }
    ];

    const { container } = renderUsersPage();

    // Find the edit button safely by looking for the pencil icon inside it
    const editButton = container.querySelector('.lucide-pencil')?.closest('button');
    expect(editButton).toBeInTheDocument();
    await user.click(editButton!);

    // FIX: Use findByRole to await the modal
    const modal = await screen.findByRole("dialog", { name: "Edit User" });
    expect(modal).toBeInTheDocument();

    // Change the name input
    const nameInput = screen.getByLabelText("Name");
    await user.clear(nameInput); 
    await user.type(nameInput, "New Name");

    // Save changes
    await user.click(screen.getByRole("button", { name: "Update User" }));

    expect(mockUpdateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 99,
        name: "New Name",
        email: "old@mail.com",
      })
    );
  });

  it("calls deleteUser when the trash icon is clicked", () => {
    mockStore.users = [
      { id: 42, name: "Delete Me", email: "", phone: "", company: { name: "" } }
    ];

    const { container } = renderUsersPage();

    const deleteButton = container.querySelector('.lucide-trash-2')?.closest('button');
    expect(deleteButton).toBeInTheDocument();
    
    fireEvent.click(deleteButton!);

    expect(mockDeleteUser).toHaveBeenCalledWith(42);
  });
});