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
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z',
  forms: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  search: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  bell: 'M15 17H20L18.595 15.595A1 1 0 0 1 18.25 14.878V11C18.25 8.215 16.418 5.862 13.77 5.189A2 2 0 0 0 12 3C10.894 3 9.903 3.455 9.23 4.189C6.582 5.862 4.75 8.215 4.75 11V14.878A1 1 0 0 1 4.405 15.595L3 17H8M15 17A3 3 0 0 1 9 17M15 17H9',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1',
  chevronLeft: 'M15 19l-7-7 7-7',
  chevronRight: 'M9 18l6-6-6-6',
};

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
  { id: 'agenda', label: 'Agendas', icon: ICONS.calendar },
  { id: 'forms', label: 'Google Forms', icon: ICONS.forms },
  { id: 'analise', label: 'Análise', icon: ICONS.search },
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
        w-full flex items-center rounded-xl transition-all duration-200 group cursor-pointer
        ${collapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'}
        ${active
          ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/15'
          : 'text-wine-400 hover:text-wine-100 hover:bg-white/5'
        }
      `}
    >
      <div className={`
        shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all
        ${active ? 'bg-wine-500 shadow-md shadow-wine-900/40' : 'group-hover:bg-white/10'}
      `}>
        <Icon d={item.icon} className="w-3.5 h-3.5" />
      </div>
      {!collapsed && (
        <span className="text-xs font-semibold whitespace-nowrap flex-1 text-left">{item.label}</span>
      )}
      {active && !collapsed && (
        <div className="w-1 h-1 rounded-full bg-wine-400" />
      )}
    </button>
  );
}

// ============================================================
// Sidebar
// ============================================================
function Sidebar({
  activeItem,
  onNavigate,
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: {
  activeItem: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const { currentUser, logout } = useAuth();
  if (!currentUser) return null;

  return (
    <>
      {/* Backdrop para Menu Mobile */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-wine-950/45 backdrop-blur-xs md:hidden transition-opacity duration-300 animate-[fadeIn_0.2s_ease]"
        />
      )}

      <aside className={`
        flex flex-col h-full
        bg-gradient-to-b from-wine-950 via-wine-900 to-wine-950
        border-r border-wine-800/40
        transition-all duration-300 ease-in-out
        
        /* Regras de Layout Mobile vs Desktop */
        fixed md:relative inset-y-0 left-0 z-50
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-[72px] min-w-[72px] max-w-[72px]' : 'w-64 min-w-[16rem] max-w-[16rem]'}
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
          
          {/* Toggle Desktop */}
          <button
            onClick={onToggle}
            className={`text-wine-500 hover:text-wine-200 transition-colors p-1.5 rounded-lg hover:bg-wine-800/50 ${collapsed ? 'hidden' : 'hidden md:block'}`}
            aria-label="Recolher menu"
          >
            <Icon d={ICONS.chevronLeft} className="w-3.5 h-3.5" />
          </button>
          
          {/* Botão Fechar Mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden block text-wine-400 hover:text-wine-200 p-1.5 rounded-lg hover:bg-wine-800/50"
            aria-label="Fechar menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {collapsed && (
            <button
              onClick={onToggle}
              className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-wine-700 border border-wine-600 shadow-md text-wine-200 hover:text-white flex items-center justify-center transition-all hover:bg-wine-600 hidden md:flex"
            >
              <Icon d={ICONS.chevronRight} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
            />
          ))}
        </nav>

        {/* Perfil + Sair */}
        <div className={`border-t border-wine-800/40 ${collapsed ? 'p-2' : 'p-3'} space-y-2`}>
          <div className={`flex items-center rounded-xl p-2 ${collapsed ? 'justify-center' : 'gap-3'}`}>
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
          </div>
          
          <button
            onClick={() => {
              logout();
              onCloseMobile();
            }}
            className={`
              w-full flex items-center rounded-xl text-wine-300 hover:text-white hover:bg-red-950/40 transition-all duration-200 cursor-pointer
              ${collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2'}
            `}
          >
            <div className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-white/5">
              <Icon d={ICONS.logout} className="w-3.5 h-3.5" />
            </div>
            {!collapsed && (
              <span className="text-xs font-semibold">Sair da Conta</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

// ============================================================
// Header
// ============================================================
function Header({
  activeItem,
  onAdd,
  onToggleMobileMenu,
}: {
  activeItem: string;
  onAdd: () => void;
  onToggleMobileMenu: () => void;
}) {
  const { currentUser, hasPermission } = useAuth();
  if (!currentUser) return null;
  const labels: Record<string, string> = {
    dashboard: 'Dashboard',
    agenda: 'Agendas',
    forms: 'Google Forms',
    analise: 'Análise de Desempenho',
  };
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  const canAdd = hasPermission('canViewOwnStats') || hasPermission('canViewWeeklyAgenda');

  return (
    <header className="h-16 bg-white border-b border-ice-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-ice-200/50">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Hambúrguer Menu Mobile */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden block text-ice-500 hover:text-ice-800 p-1.5 rounded-lg hover:bg-ice-100/80 transition-colors shrink-0"
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-display font-bold text-ice-900 truncate max-w-[140px] sm:max-w-none">
            {labels[activeItem] ?? activeItem}
          </h1>
          <p className="text-[10px] sm:text-xs text-ice-400 capitalize truncate max-w-[120px] sm:max-w-none">
            {dateStr}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Botão de ação principal */}
        {canAdd && activeItem === 'dashboard' && (
          <button
            onClick={onAdd}
            id="btn-registrar-atendimento"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-wine-800 to-wine-600 text-white text-[10px] sm:text-xs font-bold
              shadow-md shadow-wine-900/25 hover:shadow-wine-800/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="hidden sm:inline">Registrar Atendimento</span>
            <span className="sm:hidden inline">Registrar</span>
          </button>
        )}

        {/* Notificações */}
        <button className="relative w-9 h-9 rounded-xl bg-ice-100 hover:bg-ice-200 flex items-center justify-center text-ice-500 hover:text-ice-800 transition-all cursor-pointer">
          <Icon d={ICONS.bell} className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-wine-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-ice-200">
          <div className="w-9 h-9 rounded-xl bg-wine-700 flex items-center justify-center text-white font-bold text-sm shadow ring-2 ring-wine-200 shrink-0">
            {currentUser.avatar}
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="text-sm font-semibold text-ice-900 leading-tight truncate max-w-[120px]">{currentUser.name}</p>
            <p className="text-xs text-ice-400 truncate max-w-[140px]">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// DashboardLayout — Layout raiz (sem faixa de dev no topo)
// ============================================================
export default function DashboardLayout({
  children,
  activeItem,
  onNavigate,
}: {
  children: React.ReactNode;
  activeItem: string;
  onNavigate: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-ice-50 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          activeItem={activeItem}
          onAdd={() => setShowAddModal(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 bg-gray-50/50 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Modal de registro */}
      <AddAppointmentModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
