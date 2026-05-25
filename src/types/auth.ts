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
  code?: string; // código do vendedor (ex: 093)
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
  { id: '1',   name: 'Diogo',     role: 'ANALISTA',   avatar: 'DI', email: 'diogo@valochisousa.com.br' },
  { id: '2',   name: 'Carlos',    role: 'GERENTE',     avatar: 'CA', email: 'carlos@valochisousa.com.br' },
  { id: '3',   name: 'Lázaro',    role: 'SUPERVISOR',  avatar: 'LZ', email: 'lazaro@valochisousa.com.br' },
  { id: '093', name: 'Guilherme', role: 'VENDEDOR',    avatar: 'GU', email: 'guilherme@valochisousa.com.br', meta: 400000, code: '093' },
  { id: '116', name: 'Natália',   role: 'VENDEDOR',    avatar: 'NA', email: 'natalia@valochisousa.com.br',  meta: 200000, code: '116' },
  { id: '117', name: 'Keller',    role: 'VENDEDOR',    avatar: 'KE', email: 'keller@valochisousa.com.br',   meta: 120000, code: '117' },
  { id: '115', name: 'Israel',    role: 'VENDEDOR',    avatar: 'IS', email: 'israel@valochisousa.com.br',   meta: 200000, code: '115' },
  { id: '119', name: 'Althieres', role: 'VENDEDOR',    avatar: 'AL', email: 'althieres@valochisousa.com.br',meta: 80000,  code: '119' },
  { id: '118', name: 'Jorge',     role: 'VENDEDOR',    avatar: 'JO', email: 'jorge@valochisousa.com.br',    meta: 40000,  code: '118' },
  { id: '107', name: 'Everaldo',  role: 'VENDEDOR',    avatar: 'EV', email: 'everaldo@valochisousa.com.br', meta: 80000,  code: '107' },
  { id: '094', name: 'Relson',    role: 'VENDEDOR',    avatar: 'RE', email: 'relson@valochisousa.com.br',   meta: 250000, code: '094' },
];

export const SYSTEM_PASSWORD = '123';
