import { Link } from 'react-router-dom';

export default function About() {
  const timeline = [{ step: 'I', title: 'Архивное исследование', desc: 'Поиск исторических чертежей в РГИА, ГАРФ, Эрмитаже.' }, { step: 'II', title: 'Натурное обследование', desc: 'Обмеры, фотофиксация, определение марки сплава.' }, { step: 'III', title: '3D-модель / чертёж', desc: 'Создание точной модели на основе архивных данных.' }, { step: 'IV', title: 'Изготовление прототипа', desc: 'Проверка соответствия историческому оригиналу.' }, { step: 'V', title: 'Согласование с КГИОП', desc: 'Подготовка документов, получение заключения.' }, { step: 'VI', title: 'Производство партии', desc: 'Контроль каждой единицы, спектрометрия.' }, { step: 'VII', title: 'Паспортизация и монтаж', desc: 'Оформление паспортов, шеф-монтаж.' }];
  return (
    <div>
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10"><p className="label-gold mb-8">Манифест</p><p className="text-3xl md:text-5xl leading-tight font-medium max-w-4xl tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Мы воссоздаём утраченное, опираясь на архив, металлургию и ремесло. <span style={{ color: 'var(--c-gold)' }}>Не стилизуем — а восстанавливаем.</span></p></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}><p className="label-gold mb-6">Тигель</p><h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Металлургия и точность</h2><p className="leading-relaxed mb-8 font-light" style={{ color: 'var(--c-ash)' }}>Контроль химического состава каждой партии. Латунь Л63 по ГОСТ 17711-93, ЛС59-1, стали Ст3, ЧХН. Спектрометрический анализ, паспорт на каждую партию.</p><div className="aspect-video" style={{ backgroundColor: 'var(--c-iron)' }}><img src="https://image.qwenlm.ai/generated-images/75da76e4-b429-4804-9c13-d12cd98bdd4f/_result.png" alt="Литейный цех" className="w-full h-full object-cover" loading="lazy" /></div></div>
            <div className="p-8 md:p-12" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}><p className="label-gold mb-6">Горн</p><h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Ремесло и форма</h2><p className="leading-relaxed mb-8 font-light" style={{ color: 'var(--c-ash)' }}>Художественная ковка, ручная формовка, патинирование по историческим рецептурам. Следы ремесла — доказательство подлинности.</p><div className="aspect-video" style={{ backgroundColor: 'var(--c-iron)' }}><img src="https://image.qwenlm.ai/generated-images/ce2bdc63-18ca-47e6-979b-6d240f7ef912/_result.png" alt="Кузнечный цех" className="w-full h-full object-cover" loading="lazy" /></div></div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="container"><p className="label-gold mb-6">Методология</p><h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Семь шагов</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">{timeline.map((step, i) => (<div key={i} className="flex gap-8 py-8 group" style={{ borderBottom: '1px solid var(--c-rule-light)' }}><div className="text-3xl font-bold shrink-0 forge-text" style={{ fontFamily: 'var(--f-display)' }}>{step.step}</div><div><h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>{step.title}</h3><p className="text-sm leading-relaxed font-light" style={{ color: 'var(--c-ash)' }}>{step.desc}</p></div></div>))}</div></div>
      </section>
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 134, 11, 0.08) 0%, transparent 60%)' }}></div>
        <div className="container relative z-10 text-center"><h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Нужна фурнитура для ОКН?</h2><Link to="/order" className="btn-forge">Рассчитать по проекту КГИОП</Link></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
    </div>
  );
}
