import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DashboardProvider } from './context/DashboardContext'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import './index.css'

// ============================================================
// AppRouter — decide se mostra Login ou Dashboard
// ============================================================
function AppRouter() {
  const { isAuthenticated, currentUser, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated || !currentUser) {
    return <LoginPage />;
  }

  const isFullAccess = hasPermission('canViewAllLeads');

  return (
    <DashboardProvider userId={currentUser.id} isFullAccess={isFullAccess}>
      <DashboardLayout activeItem={activeTab} onNavigate={setActiveTab}>
        <Dashboard activeTab={activeTab} />
      </DashboardLayout>
    </DashboardProvider>
  );
}

// ============================================================
// App raiz
// ============================================================
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
