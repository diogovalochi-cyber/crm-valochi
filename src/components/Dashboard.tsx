import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import type { AgendaItem } from '../context/DashboardContext';

// ============================================================
// Dados Oficiais de Vendedores (01/05 a 23/05)
// ============================================================
export interface SellerOfficialData {
  id: string;
  name: string;
  code: string;
  faturamento: number;
  pedidos: number;
  maiorCliente: string;
  avatar: string;
  clientes: { name: string; value: number }[];
}

export const VENDEDORES_DATA: SellerOfficialData[] = [
  {
    id: '4',
    name: 'Guilherme',
    code: '093',
    faturamento: 397646.22,
    pedidos: 224,
    maiorCliente: 'Samuel de Oliveira Chagas',
    avatar: 'GU',
    clientes: [
      { name: 'Samuel de Oliveira Chagas', value: 154294.00 },
      { name: 'Rede Fast Food Central', value: 75400.00 },
      { name: 'Panificadora Estrela do Norte', value: 52800.00 },
      { name: 'Supermercado Boa Compra', value: 38500.00 },
      { name: 'Mercadinho Alvorada', value: 25000.00 },
      { name: 'Panificadora Silva', value: 20000.00 },
      { name: 'Pão de Queijo & Cia', value: 15000.00 },
      { name: 'Café da Manhã Feliz', value: 14652.22 }
    ]
  },
  {
    id: '11',
    name: 'Relson',
    code: '094',
    faturamento: 212441.19,
    pedidos: 42,
    maiorCliente: 'Peg Leve',
    avatar: 'RE',
    clientes: [
      { name: 'Peg Leve', value: 32501.96 },
      { name: 'Embraer Cantina', value: 28400.00 },
      { name: 'Padaria Vale das Letras', value: 21200.00 },
      { name: 'Hotel Quatro Estações', value: 18500.00 },
      { name: 'Supermercado Ricoy', value: 15000.00 },
      { name: 'Padaria Central Sul', value: 12000.00 },
      { name: 'Restaurante Bom Gosto', value: 10000.00 },
      { name: 'Outros Clientes Consolidados', value: 74839.23 }
    ]
  },
  {
    id: '7',
    name: 'Israel',
    code: '115',
    faturamento: 165187.17,
    pedidos: 64,
    maiorCliente: 'Ipava Raio Supermercado',
    avatar: 'IS',
    clientes: [
      { name: 'Ipava Raio Supermercado', value: 48200.00 },
      { name: 'Rede Giraffas SP', value: 39500.00 },
      { name: 'Hospital São Lucas', value: 27400.00 },
      { name: 'Cantina Universitária', value: 22800.00 },
      { name: 'Supermercado Primavera', value: 15000.00 },
      { name: 'Mercado da Família', value: 12287.17 }
    ]
  },
  {
    id: '5',
    name: 'Natália',
    code: '116',
    faturamento: 163851.21,
    pedidos: 28,
    maiorCliente: 'Distribuidora de Hortifruti',
    avatar: 'NA',
    clientes: [
      { name: 'Distribuidora de Hortifruti', value: 45800.00 },
      { name: 'Rede Supermercados ABC', value: 39200.00 },
      { name: 'Supermercado Peteko', value: 28100.00 },
      { name: 'Padaria Premium Sul', value: 21400.00 },
      { name: 'Mercado São José', value: 18000.00 },
      { name: 'Confeitaria Doce Mel', value: 11351.21 }
    ]
  },
  {
    id: '6',
    name: 'Keller',
    code: '117',
    faturamento: 101554.51,
    pedidos: 29,
    maiorCliente: 'Nova Geração Loja 1',
    avatar: 'KE',
    clientes: [
      { name: 'Nova Geração Loja 1', value: 31400.00 },
      { name: 'Cooperativa Agrícola SP', value: 27500.00 },
      { name: 'Armazém Campo & Cidade', value: 19800.00 },
      { name: 'Fazenda Rancho Alegre', value: 15200.00 },
      { name: 'Padaria Nova Estrela', value: 7654.51 }
    ]
  },
  {
    id: '10',
    name: 'Everaldo',
    code: '107',
    faturamento: 75402.40,
    pedidos: 20,
    maiorCliente: 'Mercado Trindade',
    avatar: 'EV',
    clientes: [
      { name: 'Mercado Trindade', value: 22400.00 },
      { name: 'Supermercados Boa Vista', value: 19200.00 },
      { name: 'Padaria São Paulo', value: 15400.00 },
      { name: 'Panificadora Central', value: 12800.00 },
      { name: 'Mercado do Bairro', value: 5602.40 }
    ]
  },
  {
    id: '8',
    name: 'Althieres',
    code: '119',
    faturamento: 66710.21,
    pedidos: 27,
    maiorCliente: 'Compre Bem',
    avatar: 'AL',
    clientes: [
      { name: 'Compre Bem', value: 21800.00 },
      { name: 'Padaria Família ABC', value: 17500.00 },
      { name: 'Mercadão Santo André', value: 14200.00 },
      { name: 'Lanchonete Sabor & Arte', value: 9800.00 },
      { name: 'Mercado Ideal', value: 3410.21 }
    ]
  },
  {
    id: '9',
    name: 'Jorge',
    code: '118',
    faturamento: 39800.59,
    pedidos: 12,
    maiorCliente: 'Familia Varejo',
    avatar: 'JO',
    clientes: [
      { name: 'Familia Varejo', value: 14500.00 },
      { name: 'Hotel Praia Grande Palace', value: 11200.00 },
      { name: 'Pousada Beira Mar', value: 8500.00 },
      { name: 'Restaurante Âncora', value: 5600.59 }
    ]
  }
];

// ============================================================
// Utilidades
// ============================================================
const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const STATUS_STYLE: Record<AgendaItem['status'], string> = {
  confirmado: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pendente:   'bg-amber-50  text-amber-700  border border-amber-200',
  concluido:  'bg-ice-100   text-ice-600    border border-ice-200',
};
// const STATUS_LABEL: Record<AgendaItem['status'], string> = {
//   confirmado: '✅ Confirmado',
//   pendente:   '⏳ Pendente',
//   concluido:  '🎯 Concluído',
// };

// ============================================================
// KPI Card
// ============================================================
function KpiCard({ label, value, sub, icon, accent, change, positive }: {
  label: string; value: string; sub?: string; icon: string;
  accent: string; change: string; positive: boolean;
}) {
  return (
    <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100
      hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ring-1 ring-black/5 ${accent.split(' ')[0]}`}>{icon}</span>
        </div>
        <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {positive ? '↑' : '↓'} {change}
        </span>
        <span className="text-xs font-medium text-gray-500">vs mês anterior</span>
      </div>
    </div>
  );
}

// ============================================================
// Gráfico de Barras (Faturamento)
// ============================================================
function BarChart({ monthlyBase }: { monthlyBase: number }) {
  const meses = useMemo(() => {
    const base = monthlyBase;
    return [
      { mes: 'Nov', val: Math.round(base * 0.62) },
      { mes: 'Dez', val: Math.round(base * 0.71) },
      { mes: 'Jan', val: Math.round(base * 0.55) },
      { mes: 'Fev', val: Math.round(base * 0.68) },
      { mes: 'Mar', val: Math.round(base * 0.78) },
      { mes: 'Abr', val: Math.round(base * 0.85) },
      { mes: 'Mai', val: base },
    ];
  }, [monthlyBase]);
  const maxVal = Math.max(...meses.map(m => m.val));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Faturamento Mensal</h3>
          <p className="text-xs text-ice-400 mt-0.5">Evolução dos últimos 7 meses</p>
        </div>
        <select className="text-xs bg-ice-50 border border-ice-200 rounded-lg px-2.5 py-1.5 text-ice-600 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-wine-300 transition-all">
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <div className="flex items-end gap-2" style={{ height: '130px' }}>
        {meses.map((m) => {
          const pct = Math.round((m.val / maxVal) * 100);
          const isActive = m.mes === 'Mai';
          return (
            <div key={m.mes} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
              {/* Tooltip */}
              <div className="relative w-full flex items-end" style={{ height: '110px' }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover/bar:block
                  text-[9px] font-bold text-ice-600 whitespace-nowrap bg-white border border-ice-200 px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  {fmt(m.val)}
                </div>
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-wine-800 to-wine-500'
                      : 'bg-gradient-to-t from-wine-200/70 to-wine-100/40 group-hover/bar:from-wine-300/80'
                  }`}
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-wine-600' : 'text-ice-400'}`}>{m.mes}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Agenda
// ============================================================
function AgendaSection({ items, onUpdateStatus }: {
  items: AgendaItem[];
  onUpdateStatus: (id: string, status: AgendaItem['status']) => void;
}) {
  const today = new Date().toISOString().split('T')[0];
  const todayItems = items.filter(i => i.data >= today).slice(0, 7);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Agenda da Semana</h3>
          <p className="text-xs text-ice-400 mt-0.5">{todayItems.length} compromisso(s) próximos</p>
        </div>
        <span className="text-xs font-semibold text-wine-600 bg-wine-50/80 border border-wine-100/50 px-3 py-1 rounded-xl shadow-sm">
          {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
        </span>
      </div>

      <div className="divide-y divide-ice-100/50 flex-1 overflow-y-auto">
        {todayItems.length === 0 ? (
          <div className="px-6 py-12 text-center my-auto">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm font-medium text-ice-500">Nenhum compromisso agendado</p>
            <p className="text-xs text-ice-400 mt-1">Registre um atendimento para começar</p>
          </div>
        ) : todayItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-ice-50/50 transition-colors group">
            {/* Bloco de Data e Hora - Alinhado à esquerda */}
            <div className="shrink-0 flex items-center gap-2.5 w-[110px]">
              <span className="text-xs font-bold text-wine-800 bg-wine-50/80 border border-wine-100/60 px-2 py-0.5 rounded-lg shadow-sm">
                {item.hora}
              </span>
              <span className="text-[10px] font-semibold text-ice-400 whitespace-nowrap uppercase tracking-wider">
                {new Date(item.data + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </span>
            </div>
            
            {/* Bloco Central - Cliente + Produto em formato flex expandido */}
            <div className="flex-1 min-w-0 flex items-center justify-between gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ice-900 truncate group-hover:text-wine-800 transition-colors">{item.cliente}</p>
                <p className="text-xs text-ice-400 mt-0.5 truncate font-normal leading-relaxed">{item.tipo}</p>
              </div>
              
              {/* Bloco de Ação - Valor + Dropdown de Status Lado a Lado */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-ice-800 tabular-nums">{fmt(item.valor)}</span>
                <select
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value as AgendaItem['status'])}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-wine-300 transition-all ${STATUS_STYLE[item.status]}`}
                >
                  <option value="confirmado">✅ Confirmado</option>
                  <option value="pendente">⏳ Pendente</option>
                  <option value="concluido">🎯 Concluído</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// ============================================================
// Desempenho por Profissional (Vendedores Oficiais)
// ============================================================
function DesempenhoProfissional({ onSelectVendedor }: { onSelectVendedor: (v: SellerOfficialData) => void }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Desempenho por Profissional</h3>
          <p className="text-xs text-ice-400 mt-0.5">Faturamento real acumulado (01/05 a 23/05)</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-wine-600 bg-wine-50 px-2.5 py-1 rounded-full border border-wine-100">
          8 Vendedores
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VENDEDORES_DATA.map((p, i) => {
          const leaderFaturamento = VENDEDORES_DATA[0].faturamento;
          const pct = Math.round((p.faturamento / leaderFaturamento) * 100);
          return (
            <div
              key={p.id}
              onClick={() => onSelectVendedor(p)}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-50 bg-gray-50/10 hover:bg-wine-50/20 hover:border-wine-100/50 cursor-pointer transition-all duration-200 group animate-[fadeIn_0.3s_ease]"
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-wine-50 to-wine-100/80 group-hover:from-wine-100 group-hover:to-wine-200 flex items-center justify-center text-wine-800 font-bold text-xs shadow-sm ring-1 ring-wine-900/5 transition-all">
                  {p.avatar}
                </div>
                {i === 0 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥇</div>
                )}
                {i === 1 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥈</div>
                )}
                {i === 2 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥉</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-ice-900 truncate group-hover:text-wine-950 transition-colors">
                    {p.name} <span className="text-[10px] font-normal text-ice-400">({p.code})</span>
                  </span>
                  <span className="text-xs font-extrabold text-wine-700 ml-2 tabular-nums">{fmt(p.faturamento)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-ice-100/70 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-wine-700 to-wine-400 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-wine-600 shrink-0">{pct}%</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[10px] text-ice-400 font-medium">{p.pedidos} pedidos</p>
                  <p className="text-[9px] text-wine-600 font-semibold group-hover:underline">Ver Carteira →</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Meta do Vendedor (Consistente com Faturamento Oficial)
// ============================================================
function MetaVendedor({ items, meta = 50000, userId }: { items: AgendaItem[]; meta?: number; userId: string }) {
  const currentSeller = VENDEDORES_DATA.find(v => v.id === userId);
  const myItems = items.filter(i => i.vendedorId === userId && i.status === 'concluido');
  const atual = useMemo(() => {
    if (currentSeller) return currentSeller.faturamento;
    return myItems.reduce((s, i) => s + i.valor, 12500);
  }, [currentSeller, myItems]);
  const pct = Math.min(Math.round((atual / meta) * 100), 100);
  const faltam = Math.max(meta - atual, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-[fadeIn_0.35s_ease]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Minha Meta Mensal</h3>
          <p className="text-xs text-ice-400 mt-0.5">Maio 2026 · {currentSeller ? currentSeller.pedidos : myItems.length + 3} atendimentos/pedidos realizados</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-display font-black ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
            {pct}%
          </span>
        </div>
      </div>
      <div className="w-full bg-ice-100 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            pct >= 80 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
            : pct >= 50 ? 'bg-gradient-to-r from-amber-600 to-amber-400'
            : 'bg-gradient-to-r from-red-600 to-red-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-ice-500">Realizado</p>
          <p className="text-sm font-bold text-ice-900">{fmt(atual)}</p>
        </div>
        <div className="text-center">
          {faltam > 0 ? (
            <>
              <p className="text-xs text-ice-500">Faltam</p>
              <p className="text-sm font-bold text-amber-600">{fmt(faltam)}</p>
            </>
          ) : (
            <span className="text-sm font-bold text-emerald-600 font-display">🎯 Meta atingida!</span>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-ice-500">Meta Total</p>
          <p className="text-sm font-bold text-ice-900">{fmt(meta)}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Procedimentos (Produtos mais vendidos)
// ============================================================
function ProdutosMaisVendidos({ items }: { items: AgendaItem[] }) {
  const produtos = useMemo(() => {
    const map: Record<string, { count: number; total: number }> = {};
    items.forEach(i => {
      if (!map[i.tipo]) map[i.tipo] = { count: 0, total: 0 };
      map[i.tipo].count += 1;
      map[i.tipo].total += i.valor;
    });
    // Adiciona dados base
    const base = [
      { nome: 'Pão Francês Congelado', count: 41, total: 18200 },
      { nome: 'Croissant Premium',     count: 30, total: 10940 },
      { nome: 'Baguete Artesanal',     count: 24, total: 7480  },
      { nome: 'Mix Pães Especiais',    count: 22, total: 5500  },
    ];
    return base.map(b => ({
      nome: b.nome,
      count: b.count + (map[b.nome]?.count ?? 0),
      total: b.total + (map[b.nome]?.total ?? 0),
    })).sort((a, b) => b.total - a.total);
  }, [items]);

  const maxTotal = Math.max(...produtos.map(p => p.total));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-5">
        <h3 className="text-sm font-display font-bold text-ice-900">Produtos Mais Vendidos</h3>
        <p className="text-xs text-ice-400 mt-0.5">Baseado nos registros do mês</p>
      </div>
      <div className="space-y-4">
        {produtos.map((p, i) => (
          <div key={p.nome} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-ice-400 w-4 tabular-nums">#{i+1}</span>
                <span className="text-sm font-medium text-ice-800">{p.nome}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-ice-400">{p.count} pedidos · </span>
                <span className="text-xs font-bold text-ice-700">{fmt(p.total)}</span>
              </div>
            </div>
            <div className="w-full bg-ice-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-wine-600 to-wine-400 transition-all duration-700 group-hover:from-wine-700"
                style={{ width: `${Math.round((p.total / maxTotal) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Banner de permissão restrita
// ============================================================
function PermissionBanner({ role }: { role: string }) {
  const msgs: Record<string, { icon: string; msg: string }> = {
    VENDEDOR: { icon: '💼', msg: 'Você está vendo apenas seus próprios atendimentos e meta comercial.' },
    TECNICO: { icon: '🔧', msg: 'Você está vendo apenas a agenda de atendimentos técnicos da semana.' },
  };
  const info = msgs[role];
  if (!info) return null;
  return (
    <div className="flex items-center gap-3 bg-white border border-wine-200 rounded-xl px-5 py-4 shadow-sm">
      <span className="text-2xl shrink-0">{info.icon}</span>
      <div>
        <p className="text-sm font-semibold text-wine-900">Visão restrita ao perfil {role}</p>
        <p className="text-xs text-wine-600 mt-0.5">{info.msg}</p>
      </div>
    </div>
  );
}

// ============================================================
// Dashboard principal
// ============================================================
export default function Dashboard({ activeTab }: { activeTab: string }) {
  const { hasPermission, currentUser } = useAuth();
  const { agendaItems, updateItemStatus } = useDashboard();
  const [selectedVendedor, setSelectedVendedor] = useState<SellerOfficialData | null>(null);

  if (!currentUser) return null;

  // ---- Dados computados por role ----
  const myItems = useMemo(() => {
    if (!hasPermission('canViewAllLeads')) {
      // Vendedor e Técnico: só os seus
      return agendaItems.filter(i => i.vendedorId === currentUser.id);
    }
    return agendaItems;
  }, [agendaItems, hasPermission, currentUser.id]);

  const currentSellerInfo = useMemo(() => {
    return VENDEDORES_DATA.find(v => v.id === currentUser.id);
  }, [currentUser.id]);

  const totalFaturamento = useMemo(() => {
    if (hasPermission('canViewFullRevenue')) {
      return VENDEDORES_DATA.reduce((sum, v) => sum + v.faturamento, 0);
    }
    // Para vendedores, usa o faturamento oficial consolidado mais qualquer item concluído registrado nesta sessão
    const newConcluidos = myItems.filter(i => i.status === 'concluido' && i.id.startsWith('new-')).reduce((s, i) => s + i.valor, 0);
    return (currentSellerInfo?.faturamento ?? 32500) + newConcluidos;
  }, [hasPermission, currentSellerInfo, myItems]);

  const totalLeads = useMemo(() => {
    if (hasPermission('canViewAllLeads')) {
      return 150 + myItems.filter(i => i.id.startsWith('new-')).length;
    }
    return Math.round((currentSellerInfo?.pedidos ?? 10) * 1.5) + myItems.filter(i => i.id.startsWith('new-')).length;
  }, [hasPermission, currentSellerInfo, myItems]);

  // Se estiver na aba Agendas
  if (activeTab === 'agenda') {
    return (
      <div className="animate-[fadeIn_0.35s_ease] h-[calc(100vh-12rem)] min-h-[500px]">
        <AgendaSection items={myItems} onUpdateStatus={updateItemStatus} />
      </div>
    );
  }

  // Se estiver na aba Google Forms
  if (activeTab === 'forms') {
    return (
      <div className="animate-[fadeIn_0.35s_ease] space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              📝 Relatório de Visita Técnica & Comercial
            </h2>
            <p className="text-xs text-gray-500 mt-1">Este formulário simula o envio de relatórios comerciais e visitas técnicas para o Google Sheets/Forms da Valochi Sousa.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('Relatório enviado com sucesso!'); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Nome do Vendedor</label>
                <input type="text" readOnly value={currentUser.name} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-semibold focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Cargo / Perfil</label>
                <input type="text" readOnly value={currentUser.role} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-semibold focus:outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Cliente / Estabelecimento</label>
              <input type="text" required placeholder="Ex: Panificadora Alfa, Mercadinho Silva..." className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Data da Visita</label>
                <input type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Tipo de Atendimento</label>
                <select className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all cursor-pointer">
                  <option>Visita Comercial de Vendas</option>
                  <option>Acompanhamento Técnico (Padeiro)</option>
                  <option>Entrega de Amostras de Pães</option>
                  <option>Auditoria / Cobrança</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Observações da Visita / Diagnóstico</label>
              <textarea rows={4} placeholder="Descreva os pontos abordados, interesse em pão francês congelado, croissants, baguetes ou problemas com o forno/P&D..." className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all resize-none" />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wine-800 to-wine-600 hover:from-wine-700 hover:to-wine-500 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer">
              Enviar Formulário de Visita
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Se estiver na aba Análise de Desempenho
  if (activeTab === 'analise') {
    return (
      <div className="animate-[fadeIn_0.35s_ease] space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BarChart monthlyBase={Math.round(totalFaturamento)} />
          <ProdutosMaisVendidos items={agendaItems} />
        </div>
        {hasPermission('canViewTeamPerformance') && (
          <DesempenhoProfissional onSelectVendedor={setSelectedVendedor} />
        )}

        {/* Modal de Carteira de Clientes */}
        {selectedVendedor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setSelectedVendedor(null)}
              className="absolute inset-0 bg-wine-950/40 backdrop-blur-md transition-opacity duration-300"
            />
            
            <div className="relative bg-white rounded-[32px] p-7 max-w-lg w-full border border-wine-100 shadow-[0_25px_60px_rgba(74,14,23,0.18)] z-10 overflow-hidden animate-[slideUp_0.25s_ease-out]">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wine-800 via-wine-600 to-wine-400" />
              
              <div className="flex items-start gap-4 mb-6 mt-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-wine-50 to-wine-100 flex items-center justify-center text-wine-900 font-black font-display text-lg shadow-sm border border-wine-200/50">
                  {selectedVendedor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-ice-900 truncate">{selectedVendedor.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Vendedor
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-wine-600/80 mt-0.5">Código do Profissional: #{selectedVendedor.code}</p>
                </div>
                <button
                  onClick={() => setSelectedVendedor(null)}
                  className="text-ice-400 hover:text-wine-800 transition-colors p-1 rounded-lg hover:bg-ice-50"
                  aria-label="Fechar"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                  <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Faturamento Período</p>
                  <p className="text-base font-extrabold text-wine-900 mt-1">{fmt(selectedVendedor.faturamento)}</p>
                  <p className="text-[9px] text-ice-500 mt-0.5">01/05 a 23/05</p>
                </div>
                <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                  <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Total de Pedidos</p>
                  <p className="text-base font-extrabold text-ice-900 mt-1">{selectedVendedor.pedidos} pedidos</p>
                  <p className="text-[9px] text-ice-500 mt-0.5">Clientes atendidos</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-ice-800 uppercase tracking-wider">Principais Clientes da Carteira</p>
                  <span className="text-[10px] font-semibold text-wine-600 bg-wine-50/60 px-2 py-0.5 rounded-md">
                    Maior: {selectedVendedor.maiorCliente}
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto pr-1 space-y-2.5 divide-y divide-ice-100/50">
                  {selectedVendedor.clientes.map((c, idx) => (
                    <div key={idx} className="flex justify-between items-center pt-2.5 first:pt-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.name === selectedVendedor.maiorCliente ? 'bg-wine-600 animate-pulse' : 'bg-ice-300'}`} />
                        <span className={`text-xs font-semibold ${c.name === selectedVendedor.maiorCliente ? 'text-wine-900 font-bold' : 'text-ice-800'}`}>
                          {c.name}
                        </span>
                        {c.name === selectedVendedor.maiorCliente && (
                          <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-wine-100 text-wine-800 rounded">
                            Foco / Top
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-ice-700 tabular-nums">{fmt(c.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedVendedor(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-wine-800 to-wine-600 hover:from-wine-700 hover:to-wine-500 text-white font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
              >
                Entendido / Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-[fadeIn_0.35s_ease]">
      {/* Banner de permissão */}
      {(!hasPermission('canViewFullRevenue')) && (
        <PermissionBanner role={currentUser.role} />
      )}

      {/* Meta do Vendedor */}
      {hasPermission('canViewOwnMeta') && (
        <MetaVendedor items={agendaItems} meta={currentUser.meta} userId={currentUser.id} />
      )}

      {/* KPIs — Visão Gerencial Consolidada (3 Colunas) */}
      {hasPermission('canViewFullRevenue') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard
            label="Faturamento Período"
            value={fmt(totalFaturamento)}
            icon="💰"
            accent="bg-wine-50 text-wine-700"
            change="+12%"
            positive
          />
          <KpiCard
            label="Lucro Líquido (Est.)"
            value={fmt(totalFaturamento * 0.60)}
            icon="📈"
            accent="bg-wine-50 text-wine-700"
            change="+8%"
            positive
          />
          <KpiCard
            label="Leads Ativos"
            value={totalLeads.toString()}
            icon="🧲"
            accent="bg-wine-50 text-wine-700"
            change="+15"
            positive
          />
        </div>
      )}

      {/* Layout variável por permissão */}
      {hasPermission('canViewWeeklyAgenda') && (
        <>
          {/* Gráfico de Faturamento Mensal — agora em largura total */}
          {hasPermission('canViewFullRevenue') && (
            <div className="w-full mt-6">
              <BarChart monthlyBase={Math.round(totalFaturamento)} />
            </div>
          )}

          {/* Desempenho por Profissional — em largura total */}
          {hasPermission('canViewTeamPerformance') && (
            <div className="w-full mt-8">
              <DesempenhoProfissional onSelectVendedor={setSelectedVendedor} />
            </div>
          )}
        </>
      )}

      {/* Técnico: orientação para acessar aba de agendas */}
      {!hasPermission('canViewOwnStats') && hasPermission('canViewWeeklyAgenda') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto text-center my-8">
          <p className="text-4xl mb-3">📅</p>
          <h3 className="text-sm font-bold text-ice-900">Agenda Técnica e Comercial</h3>
          <p className="text-xs text-ice-500 mt-1 max-w-md mx-auto">Para visualizar seu cronograma completo de compromissos, visitas técnicas e atendimentos da semana, por favor acesse a aba **Agendas** no menu lateral esquerdo.</p>
        </div>
      )}

      {/* Modal de Carteira de Clientes */}
      {selectedVendedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedVendedor(null)}
            className="absolute inset-0 bg-wine-950/40 backdrop-blur-md transition-opacity duration-300"
          />
          
          <div className="relative bg-white rounded-[32px] p-7 max-w-lg w-full border border-wine-100 shadow-[0_25px_60px_rgba(74,14,23,0.18)] z-10 overflow-hidden animate-[slideUp_0.25s_ease-out]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wine-800 via-wine-600 to-wine-400" />
            
            <div className="flex items-start gap-4 mb-6 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-wine-50 to-wine-100 flex items-center justify-center text-wine-900 font-black font-display text-lg shadow-sm border border-wine-200/50">
                {selectedVendedor.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-ice-900 truncate">{selectedVendedor.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Vendedor
                  </span>
                </div>
                <p className="text-xs font-semibold text-wine-600/80 mt-0.5">Código do Profissional: #{selectedVendedor.code}</p>
              </div>
              <button
                onClick={() => setSelectedVendedor(null)}
                className="text-ice-400 hover:text-wine-800 transition-colors p-1 rounded-lg hover:bg-ice-50"
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Faturamento Período</p>
                <p className="text-base font-extrabold text-wine-900 mt-1">{fmt(selectedVendedor.faturamento)}</p>
                <p className="text-[9px] text-ice-500 mt-0.5">01/05 a 23/05</p>
              </div>
              <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Total de Pedidos</p>
                <p className="text-base font-extrabold text-ice-900 mt-1">{selectedVendedor.pedidos} pedidos</p>
                <p className="text-[9px] text-ice-500 mt-0.5">Clientes atendidos</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-ice-800 uppercase tracking-wider">Principais Clientes da Carteira</p>
                <span className="text-[10px] font-semibold text-wine-600 bg-wine-50/60 px-2 py-0.5 rounded-md">
                  Maior: {selectedVendedor.maiorCliente}
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto pr-1 space-y-2.5 divide-y divide-ice-100/50">
                {selectedVendedor.clientes.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center pt-2.5 first:pt-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.name === selectedVendedor.maiorCliente ? 'bg-wine-600 animate-pulse' : 'bg-ice-300'}`} />
                      <span className={`text-xs font-semibold ${c.name === selectedVendedor.maiorCliente ? 'text-wine-900 font-bold' : 'text-ice-800'}`}>
                        {c.name}
                      </span>
                      {c.name === selectedVendedor.maiorCliente && (
                        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-wine-100 text-wine-800 rounded">
                          Foco / Top
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-ice-700 tabular-nums">{fmt(c.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedVendedor(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-wine-800 to-wine-600 hover:from-wine-700 hover:to-wine-500 text-white font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
            >
              Entendido / Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
