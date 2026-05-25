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
  '4': [
    { id: 'g1', hora: '08:30', cliente: 'Samuel de Oliveira Chagas', tipo: 'Pão Francês Congelado', status: 'concluido', valor: 154294.00, vendedorId: '4', data: '2026-05-20' },
    { id: 'g2', hora: '10:30', cliente: 'Rede Fast Food Central', tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 75400.00, vendedorId: '4', data: '2026-05-21' },
    { id: 'g3', hora: '14:00', cliente: 'Panificadora Estrela do Norte', tipo: 'Baguete Artesanal',  status: 'concluido', valor: 52800.00, vendedorId: '4', data: '2026-05-22' },
    { id: 'g4', hora: '09:00', cliente: 'Supermercado Boa Compra',      tipo: 'Croissant Premium',      status: 'confirmado',valor: 38500.00, vendedorId: '4', data: '2026-05-25' },
    { id: 'g5', hora: '11:00', cliente: 'Café da Manhã Feliz',         tipo: 'Kit Café da Manhã',      status: 'pendente',  valor: 2100.00, vendedorId: '4', data: '2026-05-26' },
  ],
  // Natália — Cód 116
  '5': [
    { id: 'n1', hora: '08:30', cliente: 'Distribuidora de Hortifruti',   tipo: 'Pão Francês Congelado', status: 'concluido', valor: 45800.00, vendedorId: '5', data: '2026-05-19' },
    { id: 'n2', hora: '10:00', cliente: 'Rede Supermercados ABC',      tipo: 'Ciabatta Especial',      status: 'concluido', valor: 39200.00, vendedorId: '5', data: '2026-05-20' },
    { id: 'n3', hora: '13:30', cliente: 'Supermercado Peteko',       tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 28100.00, vendedorId: '5', data: '2026-05-21' },
    { id: 'n4', hora: '09:00', cliente: 'Padaria Premium Sul',          tipo: 'Pão de Queijo CG',       status: 'confirmado',valor: 21400.00, vendedorId: '5', data: '2026-05-25' },
  ],
  // Keller — Cód 117
  '6': [
    { id: 'k1', hora: '07:30', cliente: 'Nova Geração Loja 1',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 31400.00, vendedorId: '6', data: '2026-05-20' },
    { id: 'k2', hora: '10:00', cliente: 'Cooperativa Agrícola SP',   tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 27500.00, vendedorId: '6', data: '2026-05-22' },
    { id: 'k3', hora: '14:00', cliente: 'Armazém Campo & Cidade',    tipo: 'Kit Café da Manhã',      status: 'confirmado',valor: 19800.00, vendedorId: '6', data: '2026-05-25' },
    { id: 'k4', hora: '09:30', cliente: 'Fazenda Rancho Alegre',    tipo: 'Baguete Artesanal',      status: 'pendente',  valor: 15200.00, vendedorId: '6', data: '2026-05-26' },
  ],
  // Israel — Cód 115
  '7': [
    { id: 'i1', hora: '09:00', cliente: 'Ipava Raio Supermercado',         tipo: 'Pão Francês Congelado', status: 'concluido', valor: 48200.00,vendedorId: '7', data: '2026-05-18' },
    { id: 'i2', hora: '11:00', cliente: 'Rede Giraffas SP',       tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 39500.00, vendedorId: '7', data: '2026-05-20' },
    { id: 'i3', hora: '14:30', cliente: 'Hospital São Lucas',    tipo: 'Pão de Queijo CG',       status: 'concluido', valor: 27400.00, vendedorId: '7', data: '2026-05-21' },
    { id: 'i4', hora: '08:30', cliente: 'Cantina Universitária',   tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 22800.00, vendedorId: '7', data: '2026-05-25' },
  ],
  // Althieres — Cód 119
  '8': [
    { id: 'a1', hora: '08:00', cliente: 'Compre Bem',      tipo: 'Pão Francês Congelado', status: 'concluido', valor: 21800.00, vendedorId: '8', data: '2026-05-19' },
    { id: 'a2', hora: '10:30', cliente: 'Padaria Família ABC',      tipo: 'Croissant Premium',      status: 'concluido', valor: 17500.00, vendedorId: '8', data: '2026-05-21' },
    { id: 'a3', hora: '13:00', cliente: 'Mercadão Santo André',  tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 14200.00, vendedorId: '8', data: '2026-05-25' },
    { id: 'a4', hora: '15:30', cliente: 'Lanchonete Sabor & Arte',          tipo: 'Pão de Queijo CG',       status: 'pendente',  valor: 9800.00, vendedorId: '8', data: '2026-05-26' },
  ],
  // Jorge — Cód 118
  '9': [
    { id: 'j1', hora: '09:30', cliente: 'Familia Varejo',tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 14500.00, vendedorId: '9', data: '2026-05-20' },
    { id: 'j2', hora: '11:00', cliente: 'Hotel Praia Grande Palace',        tipo: 'Croissant Premium',      status: 'concluido', valor: 11200.00, vendedorId: '9', data: '2026-05-22' },
    { id: 'j3', hora: '14:00', cliente: 'Pousada Beira Mar',       tipo: 'Baguete Artesanal',      status: 'confirmado',valor: 8500.00,  vendedorId: '9', data: '2026-05-25' },
    { id: 'j4', hora: '16:30', cliente: 'Restaurante Âncora',      tipo: 'Pão Francês Congelado', status: 'pendente',  valor: 5600.00,  vendedorId: '9', data: '2026-05-26' },
  ],
  // Everaldo — Cód 107
  '10': [
    { id: 'e1', hora: '08:00', cliente: 'Mercado Trindade',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 22400.00, vendedorId: '10', data: '2026-05-19' },
    { id: 'e2', hora: '10:00', cliente: 'Supermercados Boa Vista',        tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 19200.00, vendedorId: '10', data: '2026-05-21' },
    { id: 'e3', hora: '13:30', cliente: 'Padaria São Paulo',     tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 15400.00, vendedorId: '10', data: '2026-05-22' },
    { id: 'e4', hora: '09:00', cliente: 'Panificadora Central',  tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 12800.00, vendedorId: '10', data: '2026-05-25' },
  ],
  // Relson — Cód 094
  '11': [
    { id: 'r1', hora: '07:30', cliente: 'Peg Leve',          tipo: 'Pão Francês Congelado', status: 'concluido', valor: 32501.96, vendedorId: '11', data: '2026-05-19' },
    { id: 'r2', hora: '10:00', cliente: 'Embraer Cantina',  tipo: 'Croissant Premium',      status: 'concluido', valor: 28400.00, vendedorId: '11', data: '2026-05-21' },
    { id: 'r3', hora: '13:00', cliente: 'Padaria Vale das Letras',    tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 21200.00, vendedorId: '11', data: '2026-05-22' },
    { id: 'r4', hora: '09:30', cliente: 'Hotel Quatro Estações',      tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 18500.00, vendedorId: '11', data: '2026-05-25' },
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
