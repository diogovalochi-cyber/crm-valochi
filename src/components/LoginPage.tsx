import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import type { LoginResult } from '../context/AuthContext';

// ============================================================
// LoginPage — Valochi Sousa CRM
// ============================================================

const VALID_HINTS = [
  { name: 'Diogo', role: 'Acesso Total', desc: 'Administrador / Diretor' },
  { name: 'Carlos', role: 'Gerente', desc: 'Acesso Administrativo Total' },
  { name: 'Lázaro', role: 'Supervisor', desc: 'Supervisor de Vendas' },
  { name: 'Guilherme', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Natália', role: 'Vendedora', desc: 'Vendedora — Restrito à carteira' },
  { name: 'Keller', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Israel', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Althieres', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Jorge', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Everaldo', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
  { name: 'Relson', role: 'Vendedor', desc: 'Vendedor — Restrito à carteira' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setError('Digite seu nome de usuário.'); triggerShake(); return; }
    if (!password) { setError('Digite a senha.'); triggerShake(); return; }

    setLoading(true);
    setError('');

    // Simula latência de rede
    await new Promise((r) => setTimeout(r, 700));

    const result: LoginResult = login(username, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? 'Erro desconhecido.');
      triggerShake();
    }
  };

  const handleSelectHint = (name: string) => {
    setUsername(name);
    setPassword('123'); // Autocompleta a senha padrão
    setShowDrawer(false); // Fecha o painel lateral
    setError('');
    // Foca no campo de senha após selecionar
    setTimeout(() => passRef.current?.focus(), 100);
  };

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center relative overflow-hidden bg-ice-950 select-none"
      style={{ background: 'linear-gradient(135deg, #100609 0%, #20050b 40%, #15090f 75%, #080608 100%)' }}>

      {/* Círculos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #C4264E 0%, transparent 70%)' }} />
        <div className="absolute -bottom-48 -right-48 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #A52040 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #4A0E17 0%, transparent 70%)' }} />
        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      {/* Botão de Demonstração (Acesso Rápido) - Canto Superior Direito */}
      <button
        onClick={() => setShowDrawer(true)}
        className="absolute top-5 right-5 z-30 flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full
          bg-white/5 border border-white/10 text-wine-300 hover:text-white hover:bg-wine-800/40 hover:border-wine-600/50
          transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
        </svg>
        <span>Painel de Demonstração</span>
      </button>

      {/* Card de Login */}
      <div className={`relative w-full max-w-md mx-4 z-10 transition-all duration-300 ${shake ? 'animate-[loginShake_0.5s_ease]' : ''}`}>

        {/* Logo e Título */}
        <div className="flex flex-col items-center mb-9">
          <div className="w-20 h-20 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 mb-4 bg-white p-1">
            <img src="/logo-icon.png" alt="Valochi Sousa" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display font-bold text-[28px] text-white tracking-tight leading-none">Valochi Sousa</h1>
          <p className="text-wine-400 text-[10px] font-bold tracking-[0.25em] uppercase mt-2">Pães Congelados · CRM</p>
        </div>

        {/* Card Principal */}
        <div className="bg-black/35 backdrop-blur-3xl border border-white/10 rounded-[32px] p-9 shadow-[0_25px_60px_rgba(0,0,0,0.5)] shadow-wine-950/20">
          <div className="mb-7 text-center">
            <h2 className="text-white font-display font-semibold text-[22px] tracking-tight">Portal Comercial</h2>
            <p className="text-wine-300/60 text-xs mt-1 font-light">Identifique-se para acessar sua carteira de vendas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Campo Nome */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-wine-300/80 tracking-widest uppercase pl-1">
                Nome de Usuário
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wine-400/70 group-focus-within:text-wine-400 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4.5 h-4.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  </svg>
                </span>
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  placeholder="Seu nome comercial..."
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && passRef.current?.focus()}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium
                    bg-white/[0.04] border border-white/10 text-white placeholder-white/20
                    focus:outline-none focus:ring-2 focus:ring-wine-500/80 focus:border-transparent focus:bg-black/40
                    hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-wine-300/80 tracking-widest uppercase pl-1">
                Senha de Acesso
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wine-400/70 group-focus-within:text-wine-400 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4.5 h-4.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  ref={passRef}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Sua senha..."
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm font-medium
                    bg-white/[0.04] border border-white/10 text-white placeholder-white/20
                    focus:outline-none focus:ring-2 focus:ring-wine-500/80 focus:border-transparent focus:bg-black/40
                    hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-wine-400/70 hover:text-wine-200 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4.5 h-4.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-3 bg-red-950/40 border border-red-800/40 rounded-2xl px-4 py-3 animate-[fadeInDown_0.25s_ease] shadow-inner shadow-red-950/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-red-400 shrink-0">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                <p className="text-xs text-red-200 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-white transition-all duration-300
                bg-gradient-to-r from-wine-700 via-wine-600 to-wine-500
                hover:from-wine-600 hover:via-wine-500 hover:to-wine-400
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-lg shadow-wine-950/40 hover:shadow-wine-800/50 hover:shadow-lg
                hover:-translate-y-0.5 active:translate-y-0 active:-translate-y-0 cursor-pointer
                flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validando Acesso...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Rodapé do site */}
        <p className="text-center text-[9px] text-wine-700 tracking-wider font-medium uppercase mt-9 opacity-80">
          Valochi Sousa Pães Congelados · Todos os direitos reservados
        </p>
      </div>

      {/* ============================================================
         DRAWER / PAINEL LATERAL DE DEMONSTRAÇÃO
         ============================================================ */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 pointer-events-auto ${
          showDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowDrawer(false)}
      />

      {/* Painel do Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-80 bg-[#160b0e]/95 border-l border-white/10 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out transform ${
        showDrawer ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header do Drawer */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div>
              <h3 className="text-white font-display font-semibold text-base">Acesso de Demonstração</h3>
              <p className="text-[10px] text-wine-400 font-light mt-0.5">Selecione uma conta para teste rápido</p>
            </div>
            <button
              onClick={() => setShowDrawer(false)}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-wine-300 hover:text-white hover:bg-wine-800/40 transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lista de usuários de teste */}
          <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-wine-800">
            {VALID_HINTS.map((u) => (
              <button
                key={u.name}
                onClick={() => handleSelectHint(u.name)}
                className="w-full text-left p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-wine-500/40 hover:bg-wine-900/20 transition-all duration-200 group cursor-pointer flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <h4 className="text-white font-semibold text-xs group-hover:text-wine-200 transition-colors">{u.name}</h4>
                  <p className="text-[10px] text-wine-400/80 mt-0.5 truncate">{u.desc}</p>
                </div>
                <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-md bg-wine-950 text-wine-300 border border-wine-800/50 uppercase tracking-wider">
                  {u.role}
                </span>
              </button>
            ))}
          </div>

          {/* Footer do Drawer */}
          <div className="pt-4 border-t border-white/10 mt-auto bg-gradient-to-t from-[#160b0e] to-transparent">
            <p className="text-[10px] text-wine-400 leading-relaxed font-medium">
              💡 **Dica de Teste:** O sistema valida a senha padrão <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white">123</span> para todas as credenciais expostas neste painel.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
