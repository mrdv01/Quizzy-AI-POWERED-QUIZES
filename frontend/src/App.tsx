import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import AppShell from "./components/AppShell";
import AuthForm from "./components/AuthForm";
import QuizRouter from "./QuizRouter";
import DashboardPage from "./pages/DashboardPage";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public route: login/register */}
      <Route path="/auth" element={<AuthForm />} />

      {/* Home Quiz (protected) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell>
              <QuizRouter />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Dashboard (protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppShell>
              <DashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Fallback home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
}
