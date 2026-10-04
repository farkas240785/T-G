import { useState } from 'react';
import { projects } from '../data/catalog';

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const project = selected ? projects.find(p => p.id === selected) : null;
  return (
    <div>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10"><p className="label-gold mb-6">Реализованные работы</p><h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Проекты</h1><p className="text-lg max-w-2xl font-light" style={{ color: 'var(--c-ash)' }}>Воссоздание исторической фурнитуры для объектов культурного наследия. Все работы согласованы с КГИОП.</p></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map(p => (<article key={p.id} className="group cursor-pointer card-dark overflow-hidden" onClick={() => setSelected(p.id)}><div style={{ aspectRatio: '4/3' }}><img src={p.images.cover} alt={p.object} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" /></div><div className="p-8"><p className="font-mono text-xs mb-3" style={{ color: 'var(--c-gold)' }}>{p.year} · {p.okn_status}</p><h2 className="text-2xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>{p.object}</h2><p className="text-sm font-light" style={{ color: 'var(--c-ash)' }}>{p.address}</p></div></article>))}</div>
      </section>
      {project && (<div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: 'rgba(14, 12, 10, 0.95)' }} onClick={() => setSelected(null)} role="dialog" aria-modal="true"><div className="min-h-screen flex items-center justify-center p-4"><div className="w-full max-w-4xl" style={{ backgroundColor: 'var(--c-charcoal)' }} onClick={e => e.stopPropagation()}><div className="flex justify-between items-center p-8" style={{ borderBottom: '1px solid var(--c-rule-light)' }}><p className="label-gold">Проект / {project.id}</p><button onClick={() => setSelected(null)} className="p-2 hover:text-[var(--c-gold)]" aria-label="Закрыть">✕</button></div><img src={project.images.cover} alt={project.object} className="w-full h-64 object-cover" /><div className="p-8"><h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>{project.object}</h2><p className="font-mono text-xs mb-2" style={{ color: 'var(--c-ash)' }}>{project.address}</p><p className="text-sm mb-8" style={{ color: 'var(--c-patina)' }}>{project.okn_status}</p><div className="mb-8"><p className="label mb-3">Задача</p><p className="text-base font-light" style={{ color: 'var(--c-ash)' }}>{project.task}</p></div><div className="mb-8"><p className="label mb-4">До / Процесс / После</p><div className="grid grid-cols-3 gap-4"><img src={project.images.before} alt="До" className="w-full aspect-square object-cover" loading="lazy" /><img src={project.images.process} alt="Процесс" className="w-full aspect-square object-cover" loading="lazy" /><img src={project.images.after} alt="После" className="w-full aspect-square object-cover" loading="lazy" /></div></div><div className="p-6" style={{ backgroundColor: 'var(--c-iron)', borderLeft: '3px solid var(--c-gold)' }}><p className="label-gold mb-2">Согласование КГИОП</p><p className="font-mono text-sm">{project.cgiop_letter}</p></div></div></div></div></div>)}
    </div>
  );
}
