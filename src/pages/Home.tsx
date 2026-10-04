import { Link } from 'react-router-dom';
import { projects, catalogMeta } from '../data/catalog';

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--c-void)', minHeight: '60vh' }}>
        <div className="absolute inset-0">
          <img 
            src="https://image.qwenlm.ai/generated-images/8e06472f-0069-499c-9092-d4b9f48915f8/_result.png" 
            alt="Металлургическая лаборатория" 
            className="w-full h-full object-cover opacity-40"
            style={{ filter: 'brightness(0.6) contrast(1.15) saturate(0.9)' }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8, 7, 10, 0.97) 0%, rgba(8, 7, 10, 0.75) 45%, rgba(8, 7, 10, 0.3) 100%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 40%, rgba(184, 134, 11, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 25% 60%, rgba(160, 132, 92, 0.08) 0%, transparent 50%)' }}></div>
        <div className="container relative z-10 py-16 md:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="label-gold mb-6" style={{ color: 'var(--c-gold)' }}>Литейно-кузнечная мануфактура · Санкт-Петербург · с 2014 года</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--f-display)' }}>
              <span className="forge-text">Историческая фурнитура.</span><br/>
              <span style={{ color: 'var(--c-parchment)' }}>Точное литьё и ковка</span><br/>
              <span style={{ color: 'var(--c-ash)' }}>по нормативам КГИОП</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-light" style={{ color: 'var(--c-ash)' }}>Научно обоснованное воссоздание утраченной фурнитуры для объектов культурного наследия. Контроль сплава. Согласования с КГИОП. Паспорта на каждую партию.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="btn-forge">Смотреть каталог</Link>
              <Link to="/order" className="btn-outline-light">Рассчитать по проекту КГИОП</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient-intense"></div>
      </section>

      <section style={{ backgroundColor: 'var(--c-charcoal)', borderTop: '1px solid var(--c-rule-gold)', borderBottom: '1px solid var(--c-rule-gold)' }}>
        <div className="container py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ num: '12+', label: 'лет специализации', sub: 'на объектах ОКН' }, { num: '47', label: 'объектов', sub: 'согласовано с КГИОП' }, { num: '4', label: 'марки сплавов', sub: 'Л63, ЛС59, Ст3, ЧХН' }, { num: '100%', label: 'спектрометрия', sub: 'каждой партии' }].map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold mb-3 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>{item.num}</div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--c-parchment)' }}>{item.label}</p>
                <p className="label text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <article className="relative overflow-hidden group" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src="https://image.qwenlm.ai/generated-images/c61694fe-4e28-4666-b3fe-bc7d70a43917/_result.png" alt="Металлургический контроль" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-8 md:p-10">
                <p className="label-gold mb-4">I. Тигель</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Металлургия<br />&amp; точность</h2>
                <p className="text-base leading-relaxed mb-8 font-light" style={{ color: 'var(--c-ash)' }}>Контроль химического состава каждой партии. Латунь Л63 по ГОСТ 17711-93, ЛС59-1, стали Ст3, ЧХН. Спектрометрический анализ, паспорт на каждую партию.</p>
                <Link to="/about" className="link-forge">Подробнее →</Link>
              </div>
            </article>
            <article className="relative overflow-hidden group" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src="https://image.qwenlm.ai/generated-images/368f5493-e135-4e72-a1bd-521775f2d913/_result.png" alt="Кузнечное ремесло" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-8 md:p-10">
                <p className="label-gold mb-4">II. Горн</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Ремесло<br />&amp; форма</h2>
                <p className="text-base leading-relaxed mb-8 font-light" style={{ color: 'var(--c-ash)' }}>Художественная ковка, ручная формовка, патинирование по историческим рецептурам. Мы не шлифуем следы ремесла — они и есть доказательство подлинности.</p>
                <Link to="/about" className="link-forge">Подробнее →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-20">
            <div><p className="label-gold mb-4">Каталог изделий</p><h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Типы фурнитуры</h2></div>
            <Link to="/catalog" className="link-forge hidden md:inline-block">Весь каталог →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(catalogMeta.types).slice(0, 6).map(([key, label], index) => {
              const categoryImages = [
                'https://image.qwenlm.ai/generated-images/fe2ad1d2-62b1-4d94-a9b8-ec881971d7a6/_result.png',
                'https://image.qwenlm.ai/generated-images/cbfd88a0-f4d1-4876-89c0-3b893cd8271b/_result.png',
                'https://image.qwenlm.ai/generated-images/32719f54-1100-4a15-96af-70529b0ea99a/_result.png',
                'https://image.qwenlm.ai/generated-images/e9954b1b-bfe7-4c37-8e88-3d2b071323b6/_result.png',
                'https://image.qwenlm.ai/generated-images/13c025e2-34fb-4594-a8b9-d93d3d57d966/_result.png',
                'https://image.qwenlm.ai/generated-images/6927b184-7704-4d6c-b13a-a97610f7800f/_result.png'
              ];
              return (
                <Link key={key} to={`/catalog?type=${key}`} className="group card-dark overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={categoryImages[index]} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-coal)] via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6"><h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>{label}</h3><span className="link-forge">Смотреть →</span></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-20">
            <div><p className="label-gold mb-4">Избранные работы</p><h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Проекты</h2></div>
            <Link to="/projects" className="link-forge hidden md:inline-block">Все проекты →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map(project => (
              <Link key={project.id} to="/projects" className="group">
                <div className="overflow-hidden mb-6 relative" style={{ aspectRatio: '4/3', backgroundColor: 'var(--c-charcoal)' }}>
                  <img src={project.images.cover} alt={project.object} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-coal)] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4"><span className="label-gold">{project.year}</span></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>{project.object}</h3>
                <p className="text-sm font-light" style={{ color: 'var(--c-ash)' }}>{project.address}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-40 overflow-hidden" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(184, 134, 11, 0.08) 0%, transparent 60%)' }}></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: 'var(--c-iron)' }}>
              <img src="https://image.qwenlm.ai/generated-images/6e4a6735-b04b-4517-b74a-29ad71093388/_result.png" alt="Обсуждение проекта" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="label-gold mb-6">Начать работу</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Обсудить проект</h2>
              <p className="text-lg mb-10 font-light" style={{ color: 'var(--c-ash)' }}>Оставьте заявку, и наш технолог свяжется с вами в течение одного рабочего дня для обсуждения задачи и подготовки расчёта.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/order" className="btn-forge">Рассчитать по проекту КГИОП</Link>
                <a href="tel:+78121234567" className="btn-outline-light">+7 (812) 123-45-67</a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
    </div>
  );
}
