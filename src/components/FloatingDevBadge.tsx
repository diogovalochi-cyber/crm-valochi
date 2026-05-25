import { useState } from 'react';
import { useAuth, MOCK_USERS } from '../context/AuthContext';

// ============================================================
// FloatingDevBadge — Seletor de usuário flutuante (modo dev)
// Posicionado no canto inferior direito, colapsável
// ============================================================

const ROLE_EMOJI: Record<string, string> = {
  GERENTE: '👑',
  SUPERVISOR: '🔍',
  ANALISTA: '📊',
  VENDEDOR: '💼',
  TECNICO: '🔧',
};

const ROLE_COLOR: Record<string, string> = {
  GERENTE: 'bg-wine-600',
  SUPERVISOR: 'bg-wine-500',
  ANALISTA: 'bg-ice-600',
  VENDEDOR: 'bg-emerald-700',
  TECNICO: 'bg-amber-700',
};

export default function FloatingDevBadge() {
  const { currentUser, setCurrentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Lista de usuários (visível quando expandido) */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl shadow-ice-900/20 border border-ice-200 overflow-hidden w-56 animate-[slideUp_0.2s_ease]">
          <div className="px-4 py-3 bg-wine-950 border-b border-wine-800">
            <p className="text-[10px] font-bold tracking-widest uppercase text-wine-400">Teste de Perfil RBAC</p>
          </div>
          <div className="py-1">
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => { setCurrentUser(user); setExpanded(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-ice-50 transition-colors text-left ${
                  currentUser.id === user.id ? 'bg-wine-50' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold ${ROLE_COLOR[user.role]}`}>
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ice-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-ice-500">{ROLE_EMOJI[user.role]} {user.role}</p>
                </div>
                {currentUser.id === user.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-wine-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl transition-all duration-300
          ${expanded
            ? 'bg-wine-950 text-white shadow-wine-950/40'
            : 'bg-wine-900 hover:bg-wine-800 text-white shadow-wine-900/40 hover:shadow-wine-800/50 hover:-translate-y-0.5'
          }`}
      >
        <span className="text-base leading-none">{ROLE_EMOJI[currentUser.role]}</span>
        <div className="text-left">
          <p className="text-xs font-bold text-white leading-tight">{currentUser.name.split(' ')[0]}</p>
          <p className="text-[10px] text-wine-400 leading-tight">{currentUser.role}</p>
        </div>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className={`w-3.5 h-3.5 text-wine-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Label dev mode */}
      {!expanded && (
        <p className="text-[9px] text-ice-400 font-medium tracking-widest uppercase text-right pr-1">
          DEV MODE
        </p>
      )}
    </div>
  );
}
