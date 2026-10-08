import { useState } from 'react';

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  return (
    <div>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10"><p className="label-gold mb-6">Связаться с мануфактурой</p><h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Контакты</h1></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Напишите нам</h2>
            {submitted ? (<div className="p-16 text-center" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}><p className="text-6xl mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-patina)' }}>✓</p><h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'var(--f-display)' }}>Отправлено</h3><p className="font-light" style={{ color: 'var(--c-ash)' }}>Ответим в течение 1 рабочего дня</p></div>) : (<form onSubmit={(e) => { e.preventDefault(); if (!agreed) { alert('Необходимо согласие'); return; } setSubmitted(true); }} className="space-y-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="label block mb-3">Имя *</label><input type="text" required className="w-full p-5 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors font-light" style={{ borderColor: 'var(--c-steel)' }} /></div><div><label className="label block mb-3">Организация</label><input type="text" className="w-full p-5 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors font-light" style={{ borderColor: 'var(--c-steel)' }} /></div><div><label className="label block mb-3">Телефон *</label><input type="tel" required className="w-full p-5 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors font-light" style={{ borderColor: 'var(--c-steel)' }} /></div><div><label className="label block mb-3">Email *</label><input type="email" required className="w-full p-5 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors font-light" style={{ borderColor: 'var(--c-steel)' }} /></div></div><div><label className="label block mb-3">Сообщение</label><textarea rows={5} className="w-full p-5 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors resize-none font-light" style={{ borderColor: 'var(--c-steel)' }}></textarea></div><label className="flex items-start gap-4 cursor-pointer"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-5 h-5" required /><span className="text-sm font-light" style={{ color: 'var(--c-ash)' }}>Согласен на обработку персональных данных (ФЗ-152) *</span></label><button type="submit" className="btn-forge">Отправить</button></form>)}
          </div>
          <div className="lg:col-span-5 lg:pl-16" style={{ borderLeft: '1px solid var(--c-rule-light)' }}>
            <div className="space-y-10">
              <div><p className="label-gold mb-4">Адрес</p><p className="text-2xl font-medium mb-2" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Санкт-Петербург</p><p className="font-light" style={{ color: 'var(--c-ash)' }}>191028, ул. Кузнечная, 12, лит. А<br />Вход со двора, 2 этаж</p></div>
              <div><p className="label-gold mb-4">Связь</p><a href="tel:+78121234567" className="block text-3xl font-bold mb-3 hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>+7 (812) 123-45-67</a><a href="mailto:info@tigeliGorn.ru" className="block font-light hover:text-[var(--c-gold)] transition-colors">info@tigeliGorn.ru</a></div>
              <div><p className="label-gold mb-4">Часы работы</p><p className="font-medium mb-1">Пн–Пт: 09:00 – 18:00 MSK</p><p className="text-sm font-light" style={{ color: 'var(--c-ash)' }}>Сб: по записи · Вс: выходной</p></div>
              <div className="p-8" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}><p className="label-gold mb-4">Реквизиты</p><div className="space-y-2 font-mono text-xs"><p>ООО «Тигель и Горн»</p><p>ИНН 7841234567</p><p>КПП 784101001</p><p>ОГРН 1027801234567</p></div></div>
              <div className="overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: 'var(--c-charcoal)' }}><img src="https://image.qwenlm.ai/generated-images/a639c599-f7c1-4de2-af28-8381feb1e987/_result.png" alt="Карта Санкт-Петербурга" className="w-full h-full object-cover" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
