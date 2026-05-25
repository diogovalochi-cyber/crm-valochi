import { useAuth, MOCK_USERS } from '../context/AuthContext';

// ============================================================
// UserSwitcher — Componente temporário para testar RBAC
// Discreto, posicionado no topo da tela como faixa de dev
// ============================================================

const ROLE_LABELS: Record<string, string> = {
  GERENTE: '👑 Gerente',
  SUPERVISOR: '🔍 Supervisor',
  ANALISTA: '📊 Analista',
  VENDEDOR: '💼 Vendedor',
  TECNICO: '🔧 Técnico',
};

export default function UserSwitcher() {
  const { currentUser, setCurrentUser } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-wine-950 py-1.5 px-4 shadow-lg">
      <div className="flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-wine-400 animate-pulse" />
        <span className="text-xs font-medium text-wine-300 tracking-wide uppercase">
          Modo Dev — Testando Permissões RBAC
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-wine-400">Usuário:</span>
        <select
          id="user-role-switcher"
          value={currentUser.id}
          onChange={(e) => {
            const user = MOCK_USERS.find((u) => u.id === e.target.value);
            if (user) setCurrentUser(user);
          }}
          className="text-xs bg-wine-900 text-wine-100 border border-wine-700 rounded-md px-2 py-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-wine-500 transition-all"
        >
          {MOCK_USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} — {ROLE_LABELS[user.role]}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:flex items-center gap-1 bg-wine-900/60 px-2 py-0.5 rounded-md border border-wine-700">
        <span className="text-xs text-wine-400">Cargo:</span>
        <span className="text-xs font-semibold text-wine-200">{ROLE_LABELS[currentUser.role]}</span>
      </div>
    </div>
  );
}
