import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { catalogMeta, filterProducts, CatalogProduct } from '../data/catalog';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const typeFilter = searchParams.get('type') || '';
  const materialFilter = searchParams.get('material') || '';
  const statusFilter = searchParams.get('status') || '';
  const searchFilter = searchParams.get('search') || '';
  const filtered = useMemo(() => filterProducts({ type: typeFilter, material: materialFilter, status: statusFilter, search: searchFilter }), [typeFilter, materialFilter, statusFilter, searchFilter]);
  const displayed = showMore ? filtered : filtered.slice(0, 6);
  const updateFilter = (key: string, value: string) => { const params = new URLSearchParams(searchParams); if (value) params.set(key, value); else params.delete(key); setSearchParams(params); setShowMore(false); };
  const clearFilters = () => setSearchParams({});
  const addToFolder = (product: CatalogProduct) => { const folder = JSON.parse(localStorage.getItem('tg_project_folder') || '{"items":[]}'); if (!folder.items.find((i: any) => i.id === product.id)) { folder.items.push({ id: product.id, name: product.title, article: product.id, qty: 1 }); localStorage.setItem('tg_project_folder', JSON.stringify(folder)); } };
  const getStatusStyle = (status: string) => { if (status === 'approved') return { bg: 'var(--c-patina)', text: 'Согласовано КГИОП' }; if (status === 'prototype') return { bg: 'var(--c-gold)', text: 'Архивный прототип' }; return { bg: 'var(--c-smoke)', text: 'Требует согласования' }; };

  return (
    <div>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--c-smoke)' }}><Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Главная</Link><span>/</span><span>Каталог изделий</span></nav>
          <p className="label-gold mb-4">Каталог мануфактуры</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Изделия</h1>
          <p className="label">{filtered.length} позиций в каталоге</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
      <div className="container py-16">
        <div className="flex justify-between items-center mb-12 lg:hidden"><button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-outline-light text-xs">{filtersOpen ? 'Скрыть фильтры' : 'Фильтры'}</button></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className={`lg:col-span-3 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32 p-8" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
              <div className="flex justify-between items-center mb-10 pb-6" style={{ borderBottom: '1px solid var(--c-rule-light)' }}><p className="label-gold">Фильтры</p>{(typeFilter || materialFilter || statusFilter || searchFilter) && (<button onClick={clearFilters} className="link-forge text-xs">Сбросить</button>)}</div>
              <div className="mb-10"><h3 className="label mb-6">Тип изделия</h3><div className="space-y-4">{Object.entries(catalogMeta.types).map(([key, label]) => (<label key={key} className="flex items-center gap-3 cursor-pointer group"><span className={`w-4 h-4 border flex items-center justify-center transition-colors ${typeFilter === key ? 'bg-[var(--c-gold)]' : 'border-[var(--c-steel)] group-hover:border-[var(--c-gold)]'}`}>{typeFilter === key && <span className="w-2 h-2 bg-[var(--c-coal)]"></span>}</span><input type="checkbox" className="hidden" checked={typeFilter === key} onChange={() => updateFilter('type', typeFilter === key ? '' : key)} /><span className="text-sm font-light group-hover:text-[var(--c-gold)] transition-colors">{label}</span></label>))}</div></div>
              <div className="mb-10"><h3 className="label mb-6">Материал</h3><div className="space-y-4">{Object.entries(catalogMeta.materials).map(([key, label]) => (<label key={key} className="flex items-center gap-3 cursor-pointer group"><span className={`w-4 h-4 rounded-full border-2 transition-colors ${materialFilter === key ? 'bg-[var(--c-gold)] border-[var(--c-gold)]' : 'border-[var(--c-steel)] group-hover:border-[var(--c-gold)]'}`}></span><input type="radio" name="material" className="hidden" checked={materialFilter === key} onChange={() => updateFilter('material', materialFilter === key ? '' : key)} /><span className="text-sm font-light group-hover:text-[var(--c-gold)] transition-colors">{label}</span></label>))}</div></div>
              <div className="mb-10"><h3 className="label mb-6">Статус</h3><div className="space-y-4">{Object.entries(catalogMeta.statuses).map(([key, label]) => (<label key={key} className="flex items-center gap-3 cursor-pointer group"><span className={`w-4 h-4 border flex items-center justify-center transition-colors ${statusFilter === key ? 'bg-[var(--c-gold)]' : 'border-[var(--c-steel)] group-hover:border-[var(--c-gold)]'}`}>{statusFilter === key && <span className="w-2 h-2 bg-[var(--c-coal)]"></span>}</span><input type="checkbox" className="hidden" checked={statusFilter === key} onChange={() => updateFilter('status', statusFilter === key ? '' : key)} /><span className="text-sm font-light group-hover:text-[var(--c-gold)] transition-colors">{label}</span></label>))}</div></div>
              <div><h3 className="label mb-6">Поиск по артикулу</h3><input type="text" value={searchFilter} onChange={(e) => updateFilter('search', e.target.value)} placeholder="TG-A-..." className="w-full bg-transparent border border-[var(--c-steel)] px-4 py-3 text-sm font-mono focus:outline-none focus:border-[var(--c-gold)] transition-colors" /></div>
            </div>
          </aside>
          <div className="lg:col-span-9">
            {filtered.length === 0 ? (<div className="py-32 text-center" style={{ border: '1px solid var(--c-rule-light)' }}><p className="text-2xl mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Ничего не найдено</p><button onClick={clearFilters} className="link-forge">Сбросить фильтры</button></div>) : (<>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{displayed.map(product => { const status = getStatusStyle(product.status); return (<article key={product.id} className="group"><div className="overflow-hidden mb-6 relative" style={{ aspectRatio: '4/5', backgroundColor: 'var(--c-charcoal)' }}><Link to={`/product/${product.id}`} className="block w-full h-full"><img src={product.images.main} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" /></Link><div className="absolute top-4 left-4 px-3 py-1 text-white font-mono text-xs" style={{ backgroundColor: status.bg }}>{product.id}</div></div><div><h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors leading-tight" style={{ fontFamily: 'var(--f-display)' }}><Link to={`/product/${product.id}`}>{product.title}</Link></h3><p className="label mb-4 text-xs">{catalogMeta.materials[product.material as keyof typeof catalogMeta.materials]} · {product.alloy}</p><button onClick={() => addToFolder(product)} className="link-forge">Добавить в папку</button></div></article>); })}</div>
              {!showMore && filtered.length > 6 && (<div className="text-center mt-16"><button onClick={() => setShowMore(true)} className="btn-outline-light">Показать ещё {filtered.length - 6} изделий</button></div>)}
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
}
