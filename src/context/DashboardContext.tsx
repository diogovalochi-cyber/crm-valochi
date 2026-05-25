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
  // Guilherme — Região Norte
  '4': [
    { id: 'g1', hora: '08:00', cliente: 'Padaria Estrela do Norte', tipo: 'Pão Francês Congelado', status: 'concluido', valor: 1800, vendedorId: '4', data: '2026-05-20' },
    { id: 'g2', hora: '10:30', cliente: 'Supermercado Boa Compra', tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 3200, vendedorId: '4', data: '2026-05-21' },
    { id: 'g3', hora: '14:00', cliente: 'Mercearia do Zé',          tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 720,  vendedorId: '4', data: '2026-05-22' },
    { id: 'g4', hora: '09:00', cliente: 'Café da Manhã Feliz',      tipo: 'Croissant Premium',      status: 'confirmado',valor: 2100, vendedorId: '4', data: '2026-05-25' },
    { id: 'g5', hora: '11:00', cliente: 'Hotel Bela Vista',         tipo: 'Kit Café da Manhã',      status: 'pendente',  valor: 5800, vendedorId: '4', data: '2026-05-26' },
    { id: 'g6', hora: '15:00', cliente: 'Restaurante Sabor+',       tipo: 'Baguete Artesanal',      status: 'confirmado',valor: 960,  vendedorId: '4', data: '2026-05-27' },
  ],
  // Natália — Região Sul / Redes
  '5': [
    { id: 'n1', hora: '08:30', cliente: 'Rede Supermercados ABC',   tipo: 'Pão Francês Congelado', status: 'concluido', valor: 8400, vendedorId: '5', data: '2026-05-19' },
    { id: 'n2', hora: '10:00', cliente: 'Padaria Premium Sul',      tipo: 'Ciabatta Especial',      status: 'concluido', valor: 2200, vendedorId: '5', data: '2026-05-20' },
    { id: 'n3', hora: '13:30', cliente: 'Hotel Intercidades',       tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 6500, vendedorId: '5', data: '2026-05-21' },
    { id: 'n4', hora: '09:00', cliente: 'Atacadão do Pão',          tipo: 'Pão de Queijo CG',       status: 'confirmado',valor: 3800, vendedorId: '5', data: '2026-05-25' },
    { id: 'n5', hora: '14:30', cliente: 'Bistrô Contemporâneo',     tipo: 'Focaccia Especial',      status: 'pendente',  valor: 1100, vendedorId: '5', data: '2026-05-26' },
    { id: 'n6', hora: '16:00', cliente: 'Escola de Gastronomia SP', tipo: 'Mix Pães Especiais',     status: 'confirmado',valor: 4200, vendedorId: '5', data: '2026-05-27' },
    { id: 'n7', hora: '10:00', cliente: 'Buffet Noivas & Flores',   tipo: 'Croissant Premium',      status: 'pendente',  valor: 2900, vendedorId: '5', data: '2026-05-28' },
  ],
  // Keller — Interior / Agro
  '6': [
    { id: 'k1', hora: '07:30', cliente: 'Cooperativa Agrícola SP',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 5100, vendedorId: '6', data: '2026-05-20' },
    { id: 'k2', hora: '10:00', cliente: 'Armazém Campo & Cidade',   tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 1450, vendedorId: '6', data: '2026-05-22' },
    { id: 'k3', hora: '14:00', cliente: 'Fazenda Rancho Alegre',    tipo: 'Kit Café da Manhã',      status: 'confirmado',valor: 3200, vendedorId: '6', data: '2026-05-25' },
    { id: 'k4', hora: '09:30', cliente: 'Padaria Beira Estrada',    tipo: 'Baguete Artesanal',      status: 'pendente',  valor: 890,  vendedorId: '6', data: '2026-05-26' },
    { id: 'k5', hora: '15:30', cliente: 'Pousada Recanto Verde',    tipo: 'Mix Pães Especiais',     status: 'confirmado',valor: 2600, vendedorId: '6', data: '2026-05-28' },
  ],
  // Israel — Grande SP / Food Service
  '7': [
    { id: 'i1', hora: '09:00', cliente: 'Rede Giraffas SP',         tipo: 'Pão Francês Congelado', status: 'concluido', valor: 12000,vendedorId: '7', data: '2026-05-18' },
    { id: 'i2', hora: '11:00', cliente: 'Hospital São Lucas',       tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 4200, vendedorId: '7', data: '2026-05-20' },
    { id: 'i3', hora: '14:30', cliente: 'Cantina Universitária',    tipo: 'Pão de Queijo CG',       status: 'concluido', valor: 3800, vendedorId: '7', data: '2026-05-21' },
    { id: 'i4', hora: '08:30', cliente: 'Rede Fast Food Central',   tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 7500, vendedorId: '7', data: '2026-05-25' },
    { id: 'i5', hora: '10:00', cliente: 'Aeroporto Viracopos',      tipo: 'Kit Café da Manhã',      status: 'pendente',  valor: 9200, vendedorId: '7', data: '2026-05-26' },
    { id: 'i6', hora: '16:00', cliente: 'Condomínio Emp. Tamboré',  tipo: 'Mix Pães Especiais',     status: 'confirmado',valor: 2100, vendedorId: '7', data: '2026-05-27' },
  ],
  // Althieres — ABC Paulista
  '8': [
    { id: 'a1', hora: '08:00', cliente: 'Padaria Família ABC',      tipo: 'Pão Francês Congelado', status: 'concluido', valor: 2400, vendedorId: '8', data: '2026-05-19' },
    { id: 'a2', hora: '10:30', cliente: 'Mercadão Santo André',     tipo: 'Croissant Premium',      status: 'concluido', valor: 1900, vendedorId: '8', data: '2026-05-21' },
    { id: 'a3', hora: '13:00', cliente: 'Lanchonete Sabor & Arte',  tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 680,  vendedorId: '8', data: '2026-05-25' },
    { id: 'a4', hora: '15:30', cliente: 'Delícias do Lar',          tipo: 'Pão de Queijo CG',       status: 'pendente',  valor: 1200, vendedorId: '8', data: '2026-05-26' },
    { id: 'a5', hora: '09:00', cliente: 'Buffet ABC Festas',        tipo: 'Kit Café da Manhã',      status: 'confirmado',valor: 3900, vendedorId: '8', data: '2026-05-28' },
  ],
  // Jorge — Litoral / Turismo
  '9': [
    { id: 'j1', hora: '09:30', cliente: 'Hotel Praia Grande Palace',tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 7200, vendedorId: '9', data: '2026-05-20' },
    { id: 'j2', hora: '11:00', cliente: 'Pousada Beira Mar',        tipo: 'Croissant Premium',      status: 'concluido', valor: 2100, vendedorId: '9', data: '2026-05-22' },
    { id: 'j3', hora: '14:00', cliente: 'Restaurante Âncora',       tipo: 'Baguete Artesanal',      status: 'confirmado',valor: 980,  vendedorId: '9', data: '2026-05-25' },
    { id: 'j4', hora: '16:30', cliente: 'Quiosque Praia Azul',      tipo: 'Pão Francês Congelado', status: 'pendente',  valor: 540,  vendedorId: '9', data: '2026-05-26' },
    { id: 'j5', hora: '10:00', cliente: 'Resort Guarujá',           tipo: 'Mix Pães Especiais',     status: 'confirmado',valor: 5500, vendedorId: '9', data: '2026-05-27' },
  ],
  // Everaldo — Campinas / Interior
  '10': [
    { id: 'e1', hora: '08:00', cliente: 'Supermercados Boa Vista',  tipo: 'Pão Francês Congelado', status: 'concluido', valor: 4800, vendedorId: '10', data: '2026-05-19' },
    { id: 'e2', hora: '10:00', cliente: 'Padaria São Paulo',        tipo: 'Pão de Forma Premium',  status: 'concluido', valor: 1350, vendedorId: '10', data: '2026-05-21' },
    { id: 'e3', hora: '13:30', cliente: 'Panificadora Central',     tipo: 'Mix Pães Especiais',     status: 'concluido', valor: 2200, vendedorId: '10', data: '2026-05-22' },
    { id: 'e4', hora: '09:00', cliente: 'Food Court Iguatemi CPS',  tipo: 'Ciabatta Especial',      status: 'confirmado',valor: 3100, vendedorId: '10', data: '2026-05-25' },
    { id: 'e5', hora: '15:00', cliente: 'Restaurante Universitário',tipo: 'Pão de Queijo CG',       status: 'pendente',  valor: 1800, vendedorId: '10', data: '2026-05-27' },
    { id: 'e6', hora: '11:00', cliente: 'Clube Campineiro',         tipo: 'Focaccia Especial',      status: 'confirmado',valor: 2700, vendedorId: '10', data: '2026-05-28' },
  ],
  // Relson — Vale do Paraíba
  '11': [
    { id: 'r1', hora: '07:30', cliente: 'Embraer Cantina',          tipo: 'Pão Francês Congelado', status: 'concluido', valor: 9800, vendedorId: '11', data: '2026-05-19' },
    { id: 'r2', hora: '10:00', cliente: 'Padaria Vale das Letras',  tipo: 'Croissant Premium',      status: 'concluido', valor: 2600, vendedorId: '11', data: '2026-05-21' },
    { id: 'r3', hora: '13:00', cliente: 'Hotel Quatro Estações',    tipo: 'Kit Café da Manhã',      status: 'concluido', valor: 5400, vendedorId: '11', data: '2026-05-22' },
    { id: 'r4', hora: '09:30', cliente: 'Tecnofood Indústria',      tipo: 'Pão de Forma Premium',  status: 'confirmado',valor: 3200, vendedorId: '11', data: '2026-05-25' },
    { id: 'r5', hora: '14:00', cliente: 'Condomínio Residencial',   tipo: 'Mix Pães Especiais',     status: 'pendente',  valor: 1900, vendedorId: '11', data: '2026-05-26' },
    { id: 'r6', hora: '16:00', cliente: 'Escola Integral Futuro',   tipo: 'Pão de Queijo CG',       status: 'confirmado',valor: 2400, vendedorId: '11', data: '2026-05-27' },
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
