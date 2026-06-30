import { Routes, Route } from "react-router-dom";
import Login from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "./components/layouts/MainLayout";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <MainLayout>
              <UsersPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;