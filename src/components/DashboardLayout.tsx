import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AddAppointmentModal from './AddAppointmentModal';

// ============================================================
// Ícones inline SVG
// ============================================================
const Icon = ({ d, className = '' }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round"
    className={`shrink-0 ${className}`}>
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  kanban: 'M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M9 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9M9 3v18',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z',
  contacts: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 8v-1a3 3 0 0 0-3-3',
  projects: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm9 5h6M12 12l-6 0m6 4H9',
  reports: 'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 0 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z',
  bell: 'M15 17H20L18.595 15.595A1 1 0 0 1 18.25 14.878V11C18.25 8.215 16.418 5.862 13.77 5.189A2 2 0 0 0 12 3C10.894 3 9.903 3.455 9.23 4.189C6.582 5.862 4.75 8.215 4.75 11V14.878A1 1 0 0 1 4.405 15.595L3 17H8M15 17A3 3 0 0 1 9 17M15 17H9',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1',
  chevronLeft: 'M15 19l-7-7 7-7',
  chevronRight: 'M9 18l6-6-6-6',
  bread: 'M9 5C9 3.895 10.343 3 12 3s3 .895 3 2M5 8c0-1.657 3.134-3 7-3s7 1.343 7 3v2c0 1.657-3.134 3-7 3S5 11.657 5 10V8zm0 5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6',
};

interface NavItem {
  id: string;
  label: string;
  icon: string;
  permissionKey?: 'canViewKanban' | 'canViewContatos' | 'canViewProjetos' | 'canViewRelatorios' | 'canViewWeeklyAgenda';
}

const NAV_MAIN: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
  { id: 'kanban', label: 'Kanban', icon: ICONS.kanban, permissionKey: 'canViewKanban' },
  { id: 'agenda', label: 'Agenda', icon: ICONS.calendar, permissionKey: 'canViewWeeklyAgenda' },
];

const NAV_TOOLS: NavItem[] = [
  { id: 'contatos', label: 'Contatos', icon: ICONS.contacts, permissionKey: 'canViewContatos' },
  { id: 'projetos', label: 'Projetos', icon: ICONS.projects, permissionKey: 'canViewProjetos' },
  { id: 'relatorios', label: 'Relatórios', icon: ICONS.reports, permissionKey: 'canViewRelatorios' },
];

const ROLE_BADGE: Record<string, string> = {
  GERENTE: 'bg-wine-700/80 text-wine-100',
  SUPERVISOR: 'bg-wine-600/70 text-wine-100',
  ANALISTA: 'bg-ice-600/70 text-ice-100',
  VENDEDOR: 'bg-emerald-800/70 text-emerald-100',
  TECNICO: 'bg-amber-800/70 text-amber-100',
};

// ============================================================
// NavButton
// ============================================================
function NavButton({ item, active, collapsed, onClick }: {
  item: NavItem; active: boolean; collapsed: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`
        w-full flex items-center rounded-xl transition-all duration-200 group
        ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'}
        ${active
          ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20'
          : 'text-wine-400 hover:text-wine-100 hover:bg-white/5'
        }
      `}
    >
      <div className={`
        shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all
        ${active ? 'bg-wine-500 shadow-lg shadow-wine-900/50' : 'group-hover:bg-white/10'}
      `}>
        <Icon d={item.icon} className="w-4 h-4" />
      </div>
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap flex-1 text-left">{item.label}</span>
      )}
      {active && !collapsed && (
        <div className="w-1.5 h-1.5 rounded-full bg-wine-400" />
      )}
    </button>
  );
}

// ============================================================
// Sidebar
// ============================================================
function Sidebar({ activeItem, onNavigate, collapsed, onToggle }: {
  activeItem: string; onNavigate: (id: string) => void;
  collapsed: boolean; onToggle: () => void;
}) {
  const { currentUser, hasPermission, logout } = useAuth();
  if (!currentUser) return null;
  const isVisible = (item: NavItem) => !item.permissionKey || hasPermission(item.permissionKey);

  return (
    <aside className={`
      flex flex-col h-full
      bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950
      border-r border-wine-800/40
      transition-all duration-300 ease-in-out
      ${collapsed ? 'w-[72px]' : 'w-64'}
      shadow-2xl shadow-wine-950/80
    `}>
      {/* Logo / Marca */}
      <div className={`flex items-center border-b border-wine-800/40 ${collapsed ? 'p-3 justify-center' : 'px-4 py-4 gap-3'}`}>
        {/* Logo icon */}
        <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden border border-wine-700/50 shadow-md">
          <img src="/logo-icon.png" alt="Valochi Sousa" className="w-full h-full object-cover" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <span className="font-display font-bold text-[15px] text-white tracking-tight leading-tight block">
              Valochi Sousa
            </span>
            <span className="text-[10px] text-wine-400 tracking-widest uppercase">Pães Congelados</span>
          </div>
        )}
        {/* Toggle */}
        <button
          onClick={onToggle}
          className={`text-wine-500 hover:text-wine-200 transition-colors p-1.5 rounded-lg hover:bg-wine-800/50 ${collapsed ? 'hidden' : ''}`}
          aria-label="Recolher menu"
        >
          <Icon d={ICONS.chevronLeft} className="w-3.5 h-3.5" />
        </button>
        {collapsed && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-wine-700 border border-wine-600 shadow-md text-wine-200 hover:text-white flex items-center justify-center transition-all hover:bg-wine-600"
          >
            <Icon d={ICONS.chevronRight} className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {!collapsed && (
          <p className="text-[9px] font-bold tracking-widest uppercase text-wine-600 px-3 pb-2">Menu Principal</p>
        )}
        {NAV_MAIN.filter(isVisible).map((item) => (
          <NavButton key={item.id} item={item} active={activeItem === item.id}
            collapsed={collapsed} onClick={() => onNavigate(item.id)} />
        ))}

        <div className={`my-3 border-t border-wine-800/40 ${collapsed ? 'mx-2' : 'mx-3'}`} />

        {!collapsed && (
          <p className="text-[9px] font-bold tracking-widest uppercase text-wine-600 px-3 pb-2">Ferramentas</p>
        )}
        {NAV_TOOLS.filter(isVisible).map((item) => (
          <NavButton key={item.id} item={item} active={activeItem === item.id}
            collapsed={collapsed} onClick={() => onNavigate(item.id)} />
        ))}
      </nav>

      {/* Perfil + Sair */}
      <div className={`border-t border-wine-800/40 ${collapsed ? 'p-2' : 'p-3'}`}>
        <div className={`flex items-center rounded-xl transition-colors hover:bg-white/5 cursor-pointer ${collapsed ? 'justify-center p-2' : 'gap-3 p-2'}`}>
          <div className="shrink-0 w-9 h-9 rounded-xl bg-wine-700 flex items-center justify-center text-white font-bold text-sm shadow-inner ring-1 ring-wine-600">
            {currentUser.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ROLE_BADGE[currentUser.role]}`}>
                {currentUser.role}
              </span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              title="Sair"
              className="p-1.5 rounded-lg text-wine-500 hover:text-red-300 hover:bg-red-900/30 transition-all"
            >
              <Icon d={ICONS.logout} className="w-4 h-4" />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={logout}
            title="Sair"
            className="w-full flex justify-center mt-1 p-2 rounded-xl text-wine-500 hover:text-red-300 hover:bg-red-900/30 transition-all"
          >
            <Icon d={ICONS.logout} className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}

// ============================================================
// Header
// ============================================================
function Header({ activeItem, onAdd }: { activeItem: string; onAdd: () => void }) {
  const { currentUser, hasPermission } = useAuth();
  if (!currentUser) return null;
  const labels: Record<string, string> = {
    dashboard: 'Dashboard',
    kanban: 'Kanban',
    agenda: 'Agenda da Semana',
    contatos: 'Contatos',
    projetos: 'Projetos',
    relatorios: 'Relatórios',
  };
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  const canAdd = hasPermission('canViewOwnStats') || hasPermission('canViewWeeklyAgenda');

  return (
    <header className="h-16 bg-white border-b border-ice-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-ice-200/50">
      <div>
        <h1 className="text-base font-display font-bold text-ice-900">{labels[activeItem] ?? activeItem}</h1>
        <p className="text-xs text-ice-400 capitalize">{dateStr}</p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Botão de ação principal */}
        {canAdd && activeItem === 'dashboard' && (
          <button
            onClick={onAdd}
            id="btn-registrar-atendimento"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-wine-800 to-wine-600 text-white text-xs font-bold
              shadow-md shadow-wine-900/25 hover:shadow-wine-800/35 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Registrar Atendimento
          </button>
        )}

        {/* Notificações */}
        <button className="relative w-9 h-9 rounded-xl bg-ice-100 hover:bg-ice-200 flex items-center justify-center text-ice-500 hover:text-ice-800 transition-all">
          <Icon d={ICONS.bell} className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-wine-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-ice-200">
          <div className="w-9 h-9 rounded-xl bg-wine-700 flex items-center justify-center text-white font-bold text-sm shadow ring-2 ring-wine-200">
            {currentUser.avatar}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-ice-900 leading-tight">{currentUser.name}</p>
            <p className="text-xs text-ice-400">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// DashboardLayout — Layout raiz (sem faixa de dev no topo)
// ============================================================
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex h-screen bg-ice-50 overflow-hidden">
      {/* Sidebar — posição relativa para o toggle collapsed */}
      <div className="relative shrink-0">
        <Sidebar
          activeItem={activeItem}
          onNavigate={setActiveItem}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeItem={activeItem} onAdd={() => setShowAddModal(true)} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Modal de registro */}
      <AddAppointmentModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
