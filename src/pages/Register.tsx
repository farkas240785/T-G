import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    role: 'architect' as const,
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      company: formData.company,
      role: formData.role,
      phone: formData.phone,
    });

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error || 'Ошибка регистрации');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: 'var(--c-coal)' }}>
      <div className="max-w-2xl w-full">
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
            Регистрация
          </h1>
          <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
            Создайте аккаунт для доступа к личному кабинету
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
          {error && (
            <div className="p-4" style={{ backgroundColor: 'rgba(166, 61, 47, 0.1)', border: '1px solid var(--c-error)', borderLeft: '3px solid var(--c-error)' }}>
              <p className="text-sm" style={{ color: 'var(--c-error)' }}>{error}</p>
            </div>
          )}

          {/* Company info */}
          <div>
            <p className="label-gold mb-4">Информация о компании</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="label block mb-2">
                  Название организации *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                  placeholder="ООО «Реставрация»"
                />
              </div>
              <div>
                <label htmlFor="role" className="label block mb-2">
                  Ваша роль *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                >
                  <option value="architect" style={{ color: 'var(--c-ink)' }}>ГИП / Архитектор-реставратор</option>
                  <option value="customer" style={{ color: 'var(--c-ink)' }}>Заказчик (снабжение/прораб)</option>
                  <option value="technologist" style={{ color: 'var(--c-ink)' }}>Технолог</option>
                  <option value="manager" style={{ color: 'var(--c-ink)' }}>Менеджер</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <div>
            <p className="label-gold mb-4">Личные данные</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label block mb-2">
                  ФИО *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <label htmlFor="phone" className="label block mb-2">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <p className="label-gold mb-4">Данные для входа</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="label block mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                  placeholder="Минимум 6 символов"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword" className="label block mb-2">
                Подтвердите пароль *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                placeholder="Повторите пароль"
              />
            </div>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreement"
              required
              className="mt-1 w-4 h-4"
              style={{ accentColor: 'var(--c-gold)' }}
            />
            <label htmlFor="agreement" className="text-sm" style={{ color: 'var(--c-ash)' }}>
              Я согласен на обработку персональных данных в соответствии с ФЗ-152 и принимаю условия{' '}
              <Link to="/terms" className="link-forge">пользовательского соглашения</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-forge w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          <div className="text-center pt-4" style={{ borderTop: '1px solid var(--c-rule-light)' }}>
            <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
              Уже есть аккаунт?{' '}
              <Link to="/login" className="link-forge">
                Войти
              </Link>
            </p>
          </div>
        </form>

        {/* Info */}
        <div className="mt-6 p-4" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-gold)' }}>
          <p className="label-gold mb-2">Для кого:</p>
          <ul className="text-xs space-y-1" style={{ color: 'var(--c-ash)' }}>
            <li>• Реставрационные СРО и организации</li>
            <li>• Музеи и объекты культурного наследия</li>
            <li>• Генподрядчики на объектах КГИОП</li>
            <li>• Архитекторы-реставраторы</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
