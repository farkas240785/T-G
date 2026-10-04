import { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Куда перенаправить после входа
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Ошибка входа');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: 'var(--c-coal)' }}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                <path d="M12 18C12 18 10 30 14 34C18 38 26 38 30 34C34 30 32 18 32 18" stroke="var(--c-gold)" strokeWidth="1.5" fill="none"/>
                <path d="M22 8C22 8 18 14 20 18C22 22 24 18 24 18C24 18 26 14 22 8Z" fill="var(--c-gold-rich)" opacity="0.9"/>
                <line x1="14" y1="36" x2="30" y2="36" stroke="var(--c-brass)" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                Тигель <span style={{ color: 'var(--c-gold-rich)' }}>&</span> Горн
              </div>
              <div className="label" style={{ fontSize: '10px' }}>Литейно-кузнечная мануфактура</div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            Вход в личный кабинет
          </h1>
          <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
            Управление заказами и документацией для объектов культурного наследия
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
          {error && (
            <div className="p-4" style={{ backgroundColor: 'rgba(166, 61, 47, 0.1)', border: '1px solid var(--c-error)', borderLeft: '3px solid var(--c-error)' }}>
              <p className="text-sm" style={{ color: 'var(--c-error)' }}>{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="label block mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
              style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="label block mb-2">
              Пароль *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
              style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-forge w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>

          <div className="text-center pt-4" style={{ borderTop: '1px solid var(--c-rule-light)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--c-ash)' }}>
              Нет аккаунта?{' '}
              <Link to="/register" className="link-forge">
                Зарегистрироваться
              </Link>
            </p>
            <p className="text-xs" style={{ color: 'var(--c-smoke)' }}>
              Доступно для юридических лиц: реставрационных СРО, музеев, генподрядчиков
            </p>
          </div>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-gold)' }}>
          <p className="label-gold mb-3">Демо-доступ:</p>
          <div className="space-y-2 text-xs font-mono" style={{ color: 'var(--c-ash)' }}>
            <div>
              <span style={{ color: 'var(--c-gold)' }}>Архитектор:</span> demo@tigelgorn.ru / demo123
            </div>
            <div>
              <span style={{ color: 'var(--c-gold)' }}>Менеджер:</span> manager@tigelgorn.ru / manager123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
