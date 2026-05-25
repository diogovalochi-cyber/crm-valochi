import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import type { LoginResult } from '../context/AuthContext';

// ============================================================
// LoginPage — Valochi Sousa CRM
// ============================================================

const VALID_HINTS = ['Diogo', 'Carlos', 'Lázaro', 'Guilherme', 'Natália', 'Keller',
  'Israel', 'Althieres', 'Jorge', 'Everaldo', 'Relson'];

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-ice-950"
      style={{ background: 'linear-gradient(135deg, #160a0e 0%, #2A0810 40%, #1a0f15 70%, #0f0d10 100%)' }}>

      {/* Círculos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C4264E 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #A52040 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #4A0E17 0%, transparent 70%)' }} />
        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* Card de Login */}
      <div className={`relative w-full max-w-md mx-4 ${shake ? 'animate-[loginShake_0.5s_ease]' : ''}`}>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-wine-600/40 shadow-2xl shadow-wine-950/80 mb-4">
            <img src="/logo-icon.png" alt="Valochi Sousa" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white tracking-tight">Valochi Sousa</h1>
          <p className="text-wine-400 text-xs tracking-widest uppercase mt-1">Pães Congelados · CRM Comercial</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-wine-950/50">
          <div className="mb-6">
            <h2 className="text-white font-display font-bold text-xl">Bem-vindo de volta</h2>
            <p className="text-wine-400 text-sm mt-1">Digite seu nome e senha para entrar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Campo Nome */}
            <div>
              <label className="block text-xs font-semibold text-wine-300 mb-1.5 tracking-wide uppercase">
                Nome de Usuário
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-wine-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  </svg>
                </span>
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  placeholder="Ex: Natália, Carlos, Diogo..."
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && passRef.current?.focus()}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                    bg-white/10 border border-white/15 text-white placeholder-wine-500/60
                    focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent
                    hover:border-wine-600/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-xs font-semibold text-wine-300 mb-1.5 tracking-wide uppercase">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-wine-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  ref={passRef}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm
                    bg-white/10 border border-white/15 text-white placeholder-wine-500/60
                    focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent
                    hover:border-wine-600/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-wine-500 hover:text-wine-300 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-950/40 border border-red-800/50 rounded-xl px-4 py-3 animate-[fadeInDown_0.2s_ease]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-red-400 shrink-0">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300
                bg-gradient-to-r from-wine-700 to-wine-500
                hover:from-wine-600 hover:to-wine-400
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-lg shadow-wine-900/40 hover:shadow-wine-800/50
                hover:-translate-y-0.5 active:translate-y-0
                flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  Entrar no Sistema
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Dica de usuários válidos */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[10px] text-wine-500 uppercase tracking-widest font-semibold mb-2">
              Usuários com acesso
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VALID_HINTS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setUsername(name)}
                  className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10
                    text-wine-400 hover:text-white hover:bg-wine-800/50 hover:border-wine-600/50
                    transition-all duration-150 cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-wine-600 mt-3">
              Senha padrão do sistema: <span className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-wine-400">123</span>
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-[10px] text-wine-700 mt-6">
          © 2026 Valochi Sousa Pães Congelados · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
