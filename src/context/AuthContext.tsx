import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, RolePermissions } from '../types/auth';
import { MOCK_USERS, ROLE_PERMISSIONS, SYSTEM_PASSWORD } from '../types/auth';

// ============================================================
// AuthContext — com Login / Logout real
// ============================================================

export interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  permissions: RolePermissions | null;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
  hasPermission: (key: keyof RolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const permissions: RolePermissions | null = currentUser
    ? ROLE_PERMISSIONS[currentUser.role]
    : null;

  const login = useCallback((username: string, password: string): LoginResult => {
    // Verifica senha
    if (password !== SYSTEM_PASSWORD) {
      return { success: false, error: 'Senha incorreta. Tente novamente.' };
    }

    // Busca usuário por nome (case-insensitive, ignora acentos básicos)
    const normalizado = username.trim().toLowerCase();
    const user = MOCK_USERS.find(
      (u) => u.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
             normalizado.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );

    if (!user) {
      return { success: false, error: 'Usuário não encontrado. Verifique o nome digitado.' };
    }

    // Bloqueia técnicos
    if (user.role === 'TECNICO') {
      return { success: false, error: 'Acesso não autorizado para este perfil.' };
    }

    setCurrentUser(user);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const hasPermission = useCallback((key: keyof RolePermissions): boolean => {
    if (!permissions) return false;
    return permissions[key];
  }, [permissions]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: currentUser !== null,
      permissions,
      login,
      logout,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}

// Mantido para retrocompatibilidade do AddAppointmentModal
export { MOCK_USERS };
