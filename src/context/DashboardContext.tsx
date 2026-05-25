import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// ============================================================
// Tipos
// ============================================================
export interface AgendaItem {
  id: string;
  hora: string;
  cliente: string;
  tipo: string;
  status: 'confirmado' | 'pendente' | 'concluido';
  valor: number;
  vendedorId: string;
  data: string;
}

export interface DashboardContextType {
  agendaItems: AgendaItem[];
  allItems: AgendaItem[];
  addAgendaItem: (item: Omit<AgendaItem, 'id'>) => void;
  updateItemStatus: (id: string, status: AgendaItem['status']) => void;
}

// ============================================================
// Dados por vendedor — carteiras específicas simuladas
// ============================================================
const SELLER_DATA: Record<string, AgendaItem[]> = {
  // Guilherme — Cód 093
  '093': [
    { id: 'g1', hora: '08:30', cliente: 'SAMUEL DE OLIVEIRA CHAGAS', tipo: 'Pão Francês Congelado', status: 'concluido', valor: 25928.72, vendedorId: '093', data: '2026-05-20' },
    { id: 'g2', hora: '10:30', cliente: 'AÇOUGUE TENESSE', tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 20220.24, vendedorId: '093', data: '2026-05-21' },
    { id: 'g3', hora: '14:00', cliente: 'INTECS JARDIM JARAGUA', tipo: 'Baguete Artesanal',  status: 'concluido', valor: 23848.43, vendedorId: '093', data: '2026-05-22' },
    { id: 'g4', hora: '09:00', cliente: 'MERCADO ULTRA ECONOMIA',      tipo: 'Croissant Premium',      status: 'confirmado',valor: 16410.78, vendedorId: '093', data: '2026-05-25' },
    { id: 'g5', hora: '11:00', cliente: 'PADARIA DONA BELLA',         tipo: 'Kit Café da Manhã',      status: 'pendente',  valor: 570.38, vendedorId: '093', data: '2026-05-26' },
  ],
  // Natália — Cód 116
  '116': [
    { id: 'n1', hora: '08:30', cliente: 'DISTRIBUIDORA DE HORTIFRUTIGRANJEIRO',   tipo: 'Pão Francês Congelado', status: 'concluido', valor: 22098.07, vendedorId: '116', data: '2026-05-19' },
    { id: 'n2', hora: '10:00', cliente: 'SUPERMERCADO PETEKO',      tipo: 'Ciabatta Especial',      status: 'concluido', valor: 17304.93, vendedorId: '116', data: '2026-05-20' },
    { id: 'n3', hora: '13:30', cliente: 'MERCADO GONÇALVES',       tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 8903.95, vendedorId: '116', data: '2026-05-21' },
    { id: 'n4', hora: '09:00', cliente: 'PAOZINHO DO CEU',          tipo: 'Pão de Queijo CG',       status: 'confirmado',valor: 4372.18, vendedorId: '116', data: '2026-05-25' },
  ],
  // Keller — Cód 117
  '117': [
    { id: 'k1', hora: '07:30', cliente: 'NOVA GERAÇÃO LOJA 1',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 13419.60, vendedorId: '117', data: '2026-05-20' },
    { id: 'k2', hora: '10:00', cliente: 'MERCEARIA E ADEGA LOPES',   tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 4120.19, vendedorId: '117', data: '2026-05-22' },
    { id: 'k3', hora: '14:00', cliente: 'PADARIA DA VILA',    tipo: 'Kit Café da Manhã',      status: 'confirmado',valor: 4839.80, vendedorId: '117', data: '2026-05-25' },
    { id: 'k4', hora: '09:30', cliente: 'RANCHO NOGUEIRAS',    tipo: 'Baguete Artesanal',      status: 'pendente',  valor: 2126.66, vendedorId: '117', data: '2026-05-26' },
  ],
  // Israel — Cód 115
  '115': [
    { id: 'i1', hora: '09:00', cliente: 'IPAVA RAIO SUPERMERCADO LTDA',         tipo: 'Pão Francês Congelado', status: 'concluido', valor: 15966.12, vendedorId: '115', data: '2026-05-18' },
    { id: 'i2', hora: '11:00', cliente: 'BLACK BOI',       tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 6697.29, vendedorId: '115', data: '2026-05-20' },
    { id: 'i3', hora: '14:30', cliente: 'PADARIA GOLDEN GRAO MERCADO',    tipo: 'Pão de Queijo CG',       status: 'concluido', valor: 3603.15, vendedorId: '115', data: '2026-05-21' },
    { id: 'i4', hora: '08:30', cliente: 'DUBOM CAFE',   tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 2518.43, vendedorId: '115', data: '2026-05-25' },
  ],
  // Althieres — Cód 119
  '119': [
    { id: 'a1', hora: '08:00', cliente: 'COMPRE BEM',      tipo: 'Pão Francês Congelado', status: 'concluido', valor: 6225.52, vendedorId: '119', data: '2026-05-19' },
    { id: 'a2', hora: '10:30', cliente: 'FERREIRA PAES E DOCES',      tipo: 'Croissant Premium',      status: 'concluido', valor: 4305.97, vendedorId: '119', data: '2026-05-21' },
    { id: 'a3', hora: '13:00', cliente: 'PANIFICADORA VILLAGE',  tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 1682.60, vendedorId: '119', data: '2026-05-25' },
    { id: 'a4', hora: '15:30', cliente: 'CHARMOSA',          tipo: 'Pão de Queijo CG',       status: 'pendente',  valor: 960.00, vendedorId: '119', data: '2026-05-26' },
  ],
  // Jorge — Cód 118
  '118': [
    { id: 'j1', hora: '09:30', cliente: 'FAMILIA VAREJO',tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 12648.85, vendedorId: '118', data: '2026-05-20' },
    { id: 'j2', hora: '11:00', cliente: 'MERCADO ALIANÇA LOJA 3',        tipo: 'Croissant Premium',      status: 'concluido', valor: 3315.77, vendedorId: '118', data: '2026-05-22' },
    { id: 'j3', hora: '14:00', cliente: 'PADARIA GIRASSOL',       tipo: 'Baguete Artesanal',      status: 'confirmado',valor: 1115.03,  vendedorId: '118', data: '2026-05-25' },
    { id: 'j4', hora: '16:30', cliente: 'PADARIA BELLA CASA NOVA',      tipo: 'Pão Francês Congelado', status: 'pendente',  valor: 352.59,  vendedorId: '118', data: '2026-05-26' },
  ],
  // Everaldo — Cód 107
  '107': [
    { id: 'e1', hora: '08:00', cliente: 'MERCADO TRINDADE',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 8748.59, vendedorId: '107', data: '2026-05-19' },
    { id: 'e2', hora: '10:00', cliente: 'COMERCIO DO RATINHO',        tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 8324.73, vendedorId: '107', data: '2026-05-21' },
    { id: 'e3', hora: '13:30', cliente: 'SUPERMERCADO FAMILIA',     tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 4738.82, vendedorId: '107', data: '2026-05-22' },
    { id: 'e4', hora: '09:00', cliente: 'PADARIA PAULISTINHA',  tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 1228.35, vendedorId: '107', data: '2026-05-25' },
  ],
  // Relson — Cód 094
  '094': [
    { id: 'r1', hora: '07:30', cliente: 'PEG LEVE',          tipo: 'Pão Francês Congelado', status: 'concluido', valor: 32501.96, vendedorId: '094', data: '2026-05-19' },
    { id: 'r2', hora: '10:00', cliente: 'SUPERMERCADO DO FRANGO',  tipo: 'Croissant Premium',      status: 'concluido', valor: 13916.77, vendedorId: '094', data: '2026-05-21' },
    { id: 'r3', hora: '13:00', cliente: 'MERCADO TRINDADE',    tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 10052.56, vendedorId: '094', data: '2026-05-22' },
    { id: 'r4', hora: '09:30', cliente: 'MERCADO NOGUEIRA',      tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 8650.21, vendedorId: '094', data: '2026-05-25' },
  ],
};

// Dados base para gerentes/analistas/supervisores — todos os itens consolidados
const ALL_ITEMS: AgendaItem[] = Object.values(SELLER_DATA).flat().sort((a, b) => {
  if (a.data !== b.data) return a.data.localeCompare(b.data);
  return a.hora.localeCompare(b.hora);
});

// ============================================================
// Context
// ============================================================
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children, userId, isFullAccess }: {
  children: React.ReactNode;
  userId: string;
  isFullAccess: boolean;
}) {
  // Base de dados: visão completa ou somente do vendedor
  const baseItems = useMemo<AgendaItem[]>(() =>
    isFullAccess ? ALL_ITEMS : (SELLER_DATA[userId] ?? []),
    [userId, isFullAccess]
  );

  const [extraItems, setExtraItems] = useState<AgendaItem[]>([]);

  const agendaItems = useMemo<AgendaItem[]>(() =>
    [...baseItems, ...extraItems].sort((a, b) => {
      if (a.data !== b.data) return a.data.localeCompare(b.data);
      return a.hora.localeCompare(b.hora);
    }),
    [baseItems, extraItems]
  );

  const addAgendaItem = useCallback((item: Omit<AgendaItem, 'id'>) => {
    const newItem: AgendaItem = {
      ...item,
      id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    setExtraItems((prev) => [...prev, newItem]);
  }, []);

  const updateItemStatus = useCallback((id: string, status: AgendaItem['status']) => {
    // Tenta nos extraItems primeiro; senão, mantém baseItems imutável e adiciona override
    setExtraItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, status } : i);
      }
      // Override para item base
      const base = baseItems.find((i) => i.id === id);
      if (base) return [...prev, { ...base, id: `override-${id}`, status }];
      return prev;
    });
  }, [baseItems]);

  return (
    <DashboardContext.Provider value={{ agendaItems, allItems: ALL_ITEMS, addAgendaItem, updateItemStatus }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard deve ser usado dentro de <DashboardProvider>');
  return ctx;
}
