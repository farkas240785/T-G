import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getRelatedProducts, catalogMeta } from '../data/catalog';

export default function Product() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const product = getProduct(id || '');
  if (!product) return (<div className="container py-32 text-center"><p className="text-3xl mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Изделие не найдено</p><Link to="/catalog" className="link-forge">Вернуться в каталог</Link></div>);
  const images = [product.images.main, product.images.macro, product.images.archive, product.images.object];
  const related = getRelatedProducts(product.related);
  const getStatusStyle = (status: string) => { if (status === 'approved') return { bg: 'var(--c-patina)', text: 'Согласовано КГИОП' }; if (status === 'prototype') return { bg: 'var(--c-gold)', text: 'Есть архивный прототип' }; return { bg: 'var(--c-smoke)', text: 'Требует согласования' }; };
  const status = getStatusStyle(product.status);
  const tabs = [
    { title: 'Историческая справка', content: (<div><p className="label-gold mb-4">Прототип</p><p className="text-xl font-medium mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>{product.epoch}</p><p className="font-mono text-sm mb-6" style={{ color: 'var(--c-ash)' }}>Источник: {product.source}</p><p className="text-sm leading-relaxed font-light" style={{ color: 'var(--c-ash)' }}>{product.description}</p></div>) },
    { title: 'Металлургия', content: (<div><p className="label-gold mb-4">Состав и покрытие</p><div className="p-6 mb-6" style={{ backgroundColor: 'var(--c-charcoal)' }}><table className="w-full text-sm"><tbody><tr style={{ borderBottom: '1px solid var(--c-rule-light)' }}><td className="py-3 label">Марка сплава</td><td className="py-3 font-mono text-xs">{product.alloy}</td></tr><tr style={{ borderBottom: '1px solid var(--c-rule-light)' }}><td className="py-3 label">Покрытие</td><td className="py-3 font-light">{product.coating}</td></tr><tr><td className="py-3 label">Метод</td><td className="py-3 font-light">Химическое патинирование</td></tr></tbody></table></div></div>) },
    { title: 'Соответствие ГОСТ', content: (<div><p className="label-gold mb-4">Нормативная привязка</p><div className="p-6 mb-6" style={{ backgroundColor: 'var(--c-charcoal)' }}><p className="font-mono text-sm font-medium">{product.gost}</p></div><p className="text-sm leading-relaxed font-light" style={{ color: 'var(--c-ash)' }}>Изделие соответствует требованиям ГОСТ Р 55567-2013. Паспорт включает марку сплава, химический состав, результаты спектрометрии, номер плавки, дату производства, протокол патинирования.</p></div>) },
    { title: 'Чертежи для КГИОП', content: (<div><p className="label-gold mb-4">Документация</p><div className="space-y-3">{product.documents.map((doc, i) => (<a key={i} href={doc.url} className="flex items-center justify-between p-5 hover:bg-[var(--c-charcoal)] transition-colors" style={{ borderBottom: '1px solid var(--c-rule-light)' }}><div><div className="text-sm font-medium">{doc.title}</div><div className="font-mono text-xs" style={{ color: 'var(--c-gold)' }}>{doc.format}</div></div><span className="font-mono text-xs" style={{ color: 'var(--c-gold)' }}>↗ Скачать</span></a>))}</div></div>) },
  ];
  const addToFolder = () => { const folder = JSON.parse(localStorage.getItem('tg_project_folder') || '{"items":[]}'); if (!folder.items.find((i: any) => i.id === product.id)) { folder.items.push({ id: product.id, name: product.title, article: product.id, qty: 1 }); localStorage.setItem('tg_project_folder', JSON.stringify(folder)); } };

  return (
    <div>
      <div style={{ borderBottom: '1px solid var(--c-rule-light)' }}><div className="container py-6"><nav className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--c-smoke)' }}><Link to="/" className="hover:text-[var(--c-gold)]">Главная</Link><span>/</span><Link to="/catalog" className="hover:text-[var(--c-gold)]">Каталог</Link><span>/</span><Link to={`/catalog?type=${product.type}`} className="hover:text-[var(--c-gold)]">{catalogMeta.types[product.type as keyof typeof catalogMeta.types]}</Link><span>/</span><span className="font-mono">{product.id}</span></nav></div></div>
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <div className="overflow-hidden mb-6 relative" style={{ aspectRatio: '4/5', backgroundColor: 'var(--c-charcoal)' }}><img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" /></div>
            <div className="grid grid-cols-4 gap-4">{images.map((img, i) => (<button key={i} onClick={() => setActiveImage(i)} className={`overflow-hidden transition-all ${activeImage === i ? 'ring-2 ring-[var(--c-gold)]' : 'opacity-70 hover:opacity-100'}`} style={{ aspectRatio: '1' }}><img src={img} alt="" className="w-full h-full object-cover" loading="lazy" /></button>))}</div>
          </div>
          <div className="lg:col-span-5">
            <p className="label-gold mb-6">{catalogMeta.types[product.type as keyof typeof catalogMeta.types]} · {product.id}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>{product.title}</h1>
            <div className="inline-block px-4 py-2 text-white font-mono text-xs mb-8" style={{ backgroundColor: status.bg }}>{status.text}</div>
            <div className="p-8 mb-10" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
              <p className="label mb-6">Технические характеристики</p>
              <div>{[['Марка сплава', product.alloy], ['Масса', `${product.weight_g} г`], ['Габариты', product.dimensions], ['Покрытие', product.coating], ['Способ крепления', product.mounting]].map(([k, v], i) => (<div key={i} className="grid grid-cols-2 py-4 text-sm" style={{ borderBottom: i < 4 ? '1px solid var(--c-rule-light)' : 'none' }}><span className="label">{k}</span><span className="font-mono text-xs">{v as string}</span></div>))}</div>
            </div>
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-8" style={{ borderBottom: '1px solid var(--c-rule-light)' }}>{tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`px-6 py-4 text-xs font-medium transition-colors ${activeTab === i ? 'text-[var(--c-gold)] border-b-2 border-[var(--c-gold)]' : 'text-[var(--c-smoke)] hover:text-[var(--c-parchment)]'}`}>{tab.title}</button>))}</div>
              <div>{tabs[activeTab].content}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4"><Link to="/order" className="btn-forge flex-1">Рассчитать по проекту КГИОП</Link><button onClick={addToFolder} className="btn-outline-light flex-1">В папку проекта</button></div>
          </div>
        </div>
        {related.length > 0 && (<div style={{ borderTop: '1px solid var(--c-gold)' }} className="pt-16"><p className="label-gold mb-6">Связанные изделия</p><h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Похожие изделия</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{related.map(p => (<Link key={p.id} to={`/product/${p.id}`} className="group"><div className="overflow-hidden mb-4" style={{ aspectRatio: '1', backgroundColor: 'var(--c-charcoal)' }}><img src={p.images.main} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div><p className="font-mono text-xs mb-2" style={{ color: 'var(--c-gold)' }}>{p.id}</p><p className="text-sm font-medium group-hover:text-[var(--c-gold)] transition-colors">{p.title}</p></Link>))}</div></div>)}
      </div>
    </div>
  );
}
