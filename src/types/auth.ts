// ============================================================
// Tipos de Cargo (RBAC) — Valochi Sousa CRM
// ============================================================

export type UserRole = 'VENDEDOR' | 'TECNICO' | 'SUPERVISOR' | 'GERENTE' | 'ANALISTA';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  meta?: number; // meta comercial mensal (R$)
}

// Permissões derivadas do cargo
export interface RolePermissions {
  canViewFullRevenue: boolean;
  canViewAllLeads: boolean;
  canViewTeamPerformance: boolean;
  canViewOwnStats: boolean;
  canViewOwnMeta: boolean;
  canViewWeeklyAgenda: boolean;
  canViewKanban: boolean;
  canViewContatos: boolean;
  canViewProjetos: boolean;
  canViewRelatorios: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  GERENTE: {
    canViewFullRevenue: true, canViewAllLeads: true, canViewTeamPerformance: true,
    canViewOwnStats: true, canViewOwnMeta: false, canViewWeeklyAgenda: true,
    canViewKanban: true, canViewContatos: true, canViewProjetos: true, canViewRelatorios: true,
  },
  SUPERVISOR: {
    canViewFullRevenue: true, canViewAllLeads: true, canViewTeamPerformance: true,
    canViewOwnStats: true, canViewOwnMeta: false, canViewWeeklyAgenda: true,
    canViewKanban: true, canViewContatos: true, canViewProjetos: true, canViewRelatorios: true,
  },
  ANALISTA: {
    canViewFullRevenue: true, canViewAllLeads: true, canViewTeamPerformance: true,
    canViewOwnStats: true, canViewOwnMeta: false, canViewWeeklyAgenda: true,
    canViewKanban: true, canViewContatos: true, canViewProjetos: true, canViewRelatorios: true,
  },
  VENDEDOR: {
    canViewFullRevenue: false, canViewAllLeads: false, canViewTeamPerformance: false,
    canViewOwnStats: true, canViewOwnMeta: true, canViewWeeklyAgenda: true,
    canViewKanban: true, canViewContatos: true, canViewProjetos: false, canViewRelatorios: false,
  },
  TECNICO: {
    canViewFullRevenue: false, canViewAllLeads: false, canViewTeamPerformance: false,
    canViewOwnStats: false, canViewOwnMeta: false, canViewWeeklyAgenda: true,
    canViewKanban: false, canViewContatos: true, canViewProjetos: false, canViewRelatorios: false,
  },
};

// ============================================================
// Usuários válidos do sistema
// ============================================================
export const MOCK_USERS: User[] = [
  { id: '1',  name: 'Diogo',     role: 'ANALISTA',   avatar: 'DI', email: 'diogo@valochisousa.com.br' },
  { id: '2',  name: 'Carlos',    role: 'GERENTE',     avatar: 'CA', email: 'carlos@valochisousa.com.br' },
  { id: '3',  name: 'Lázaro',    role: 'SUPERVISOR',  avatar: 'LZ', email: 'lazaro@valochisousa.com.br' },
  { id: '4',  name: 'Guilherme', role: 'VENDEDOR',    avatar: 'GU', email: 'guilherme@valochisousa.com.br', meta: 45000 },
  { id: '5',  name: 'Natália',   role: 'VENDEDOR',    avatar: 'NA', email: 'natalia@valochisousa.com.br',  meta: 50000 },
  { id: '6',  name: 'Keller',    role: 'VENDEDOR',    avatar: 'KE', email: 'keller@valochisousa.com.br',   meta: 40000 },
  { id: '7',  name: 'Israel',    role: 'VENDEDOR',    avatar: 'IS', email: 'israel@valochisousa.com.br',   meta: 42000 },
  { id: '8',  name: 'Althieres', role: 'VENDEDOR',    avatar: 'AL', email: 'althieres@valochisousa.com.br',meta: 38000 },
  { id: '9',  name: 'Jorge',     role: 'VENDEDOR',    avatar: 'JO', email: 'jorge@valochisousa.com.br',    meta: 35000 },
  { id: '10', name: 'Everaldo',  role: 'VENDEDOR',    avatar: 'EV', email: 'everaldo@valochisousa.com.br', meta: 40000 },
  { id: '11', name: 'Relson',    role: 'VENDEDOR',    avatar: 'RE', email: 'relson@valochisousa.com.br',   meta: 43000 },
];

export const SYSTEM_PASSWORD = '123';
