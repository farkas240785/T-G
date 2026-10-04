import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="no-print mt-32" style={{ backgroundColor: 'var(--c-void)', borderTop: '1px solid var(--c-rule-gold)' }}>
      <div className="gold-line"></div>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11"><path d="M12 18C12 18 10 30 14 34C18 38 26 38 30 34C34 30 32 18 32 18" stroke="var(--c-gold)" strokeWidth="1.5" fill="none"/><path d="M22 8C22 8 18 14 20 18C22 22 24 18 24 18C24 18 26 14 22 8Z" fill="var(--c-gold-rich)" opacity="0.9"/><line x1="14" y1="36" x2="30" y2="36" stroke="var(--c-brass)" strokeWidth="1.5"/></svg>
              <div className="text-lg font-semibold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Тигель <span style={{ color: 'var(--c-gold-rich)' }}>&</span> Горн</div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8 font-light" style={{ color: 'var(--c-ash)' }}>Литейно-кузнечная мануфактура. Научно обоснованное воссоздание исторической фурнитуры для объектов культурного наследия с 2014 года.</p>
            <div className="label-gold text-xs" style={{ color: 'var(--c-gold)' }}>ИНН 7841234567 · ОГРН 1027801234567</div>
          </div>
          <div className="md:col-span-3">
            <p className="label-gold mb-6" style={{ color: 'var(--c-gold)' }}>Навигация</p>
            <ul className="space-y-3">{[{ to: '/catalog', label: 'Каталог изделий' }, { to: '/projects', label: 'Проекты' }, { to: '/about', label: 'Мануфактура' }, { to: '/docs', label: 'Нормативная база' }, { to: '/order', label: 'Расчёт по проекту' }, { to: '/contacts', label: 'Контакты' }].map(i => (<li key={i.to}><Link to={i.to} className="text-sm font-light hover:text-[var(--c-gold-rich)] transition-colors" style={{ color: 'var(--c-ash)' }}>{i.label}</Link></li>))}</ul>
          </div>
          <div className="md:col-span-2">
            <p className="label-gold mb-6" style={{ color: 'var(--c-gold)' }}>Нормативы</p>
            <ul className="space-y-2 text-xs font-mono font-light" style={{ color: 'var(--c-ash)' }}><li>ГОСТ Р 55567-2013</li><li>Р-13.19.15</li><li>Регламент КГИОП</li><li>ФЗ-73 «Об ОКН»</li><li>ГОСТ 17711-93</li></ul>
          </div>
          <div className="md:col-span-2">
            <p className="label-gold mb-6" style={{ color: 'var(--c-gold)' }}>Контакты</p>
            <div className="space-y-4 text-sm font-light" style={{ color: 'var(--c-ash)' }}>
              <div><a href="tel:+78121234567" className="block text-lg font-medium hover:text-[var(--c-gold-rich)] transition-colors" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>+7 (812) 123-45-67</a><a href="mailto:info@tigeliGorn.ru" className="block hover:text-[var(--c-gold-rich)] transition-colors">info@tigeliGorn.ru</a></div>
              <div><p>191028, Санкт-Петербург</p><p>ул. Кузнечная, 12</p></div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderTop: '1px solid var(--c-rule-gold)' }}>
          <p className="font-mono text-xs font-light" style={{ color: 'var(--c-smoke)' }}>© 2014–2026 ООО «Тигель и Горн». Все права защищены.</p>
          <div className="flex gap-6 font-mono text-xs font-light" style={{ color: 'var(--c-smoke)' }}><a href="#" className="hover:text-[var(--c-gold-rich)] transition-colors">Политика конфиденциальности</a><a href="#" className="hover:text-[var(--c-gold-rich)] transition-colors">ФЗ-152</a></div>
        </div>
      </div>
    </footer>
  );
}
