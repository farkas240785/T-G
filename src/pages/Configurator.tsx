import { useState } from 'react';
import { Link } from 'react-router-dom';
import { alloys, patinas, formatCurrency } from '../data/dashboard';

export default function Configurator() {
  const [selectedAlloy, setSelectedAlloy] = useState('');
  const [selectedPatina, setSelectedPatina] = useState('');
  const [dimensions, setDimensions] = useState({ length: 180, width: 45, height: 28 });
  const [quantity, setQuantity] = useState(1);
  const [isOKN, setIsOKN] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const selectedAlloyData = alloys.find(a => a.id === selectedAlloy);
  const selectedPatinaData = patinas.find(p => p.id === selectedPatina);

  // Расчёт стоимости
  const calculatePrice = () => {
    let basePrice = 5000; // базовая цена
    const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000;
    basePrice += volume * 50;
    if (selectedAlloy === 'ls59') basePrice *= 1.2;
    if (selectedAlloy === 'st3') basePrice *= 0.8;
    if (selectedAlloy === 'chn') basePrice *= 0.9;
    if (selectedPatinaData?.type === 'hot') basePrice *= 1.3;
    return Math.round(basePrice * quantity);
  };

  // Расчёт срока
  const calculateDays = () => {
    let days = 30;
    if (quantity > 50) days += 15;
    if (selectedPatinaData?.type === 'hot') days += 7;
    return days;
  };

  const handleAlloyChange = (alloyId: string) => {
    const alloy = alloys.find(a => a.id === alloyId);
    if (isOKN && alloy && !alloy.allowedForOKN) {
      setShowWarning(true);
      return;
    }
    setSelectedAlloy(alloyId);
    setShowWarning(false);
  };

  const handlePatinaChange = (patinaId: string) => {
    const patina = patinas.find(p => p.id === patinaId);
    if (isOKN && patina && !patina.allowedForOKN) {
      setShowWarning(true);
      return;
    }
    setSelectedPatina(patinaId);
    setShowWarning(false);
  };

  return (
    <div>
      {/* Header */}
      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--c-smoke)' }}>
            <Link to="/dashboard" className="hover:text-[var(--c-gold)]">Личный кабинет</Link>
            <span>/</span>
            <span>Конфигуратор</span>
          </nav>
          <p className="label-gold mb-4">Онлайн-конфигуратор</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            Настройка изделия
          </h1>
          <p className="text-base font-light" style={{ color: 'var(--c-ash)' }}>
            Выберите параметры и получите автоматический расчёт стоимости
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>

      <section className="py-12" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Configuration */}
            <div className="lg:col-span-8">
              {/* OKN marker */}
              <div className="mb-10 p-6" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOKN}
                    onChange={(e) => setIsOKN(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-base font-medium mb-1" style={{ color: 'var(--c-parchment)' }}>
                      Заказ для объекта культурного наследия (ОКН)
                    </p>
                    <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                      Применяются ограничения по материалам и технологиям согласно нормативам КГИОП
                    </p>
                  </div>
                </label>
              </div>

              {/* Warning */}
              {showWarning && (
                <div className="mb-8 p-6" style={{ backgroundColor: 'rgba(166, 61, 47, 0.1)', border: '1px solid var(--c-error)', borderLeft: '4px solid var(--c-error)' }}>
                  <p className="text-base font-medium mb-2" style={{ color: 'var(--c-error)' }}>
                    ⚠ Стоп-фактор КГИОП
                  </p>
                  <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                    Для объектов культурного наследия запрещены материалы без исторической преемственности (ЦАМ, химические имитации патины). 
                    Выберите разрешённый материал из списка ниже.
                  </p>
                </div>
              )}

              {/* Alloy selection */}
              <div className="mb-10">
                <p className="label-gold mb-4">1. Выбор сплава</p>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                  Материал изделия
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alloys.map(alloy => {
                    const disabled = isOKN && !alloy.allowedForOKN;
                    return (
                      <button
                        key={alloy.id}
                        onClick={() => handleAlloyChange(alloy.id)}
                        disabled={disabled}
                        className={`p-6 text-left transition-all ${
                          selectedAlloy === alloy.id
                            ? 'border-2'
                            : 'border'
                        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--c-gold)]'}`}
                        style={{
                          backgroundColor: 'var(--c-charcoal)',
                          borderColor: selectedAlloy === alloy.id ? 'var(--c-gold)' : 'var(--c-rule-light)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-lg font-semibold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                            {alloy.name}
                          </p>
                          {disabled && (
                            <span className="px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-error)', color: 'white' }}>
                              ЗАПРЕЩЁН
                            </span>
                          )}
                          {!disabled && alloy.allowedForOKN && (
                            <span className="px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-patina)', color: 'white' }}>
                              ОКН ✓
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-xs mb-2" style={{ color: 'var(--c-gold)' }}>{alloy.gost}</p>
                        <p className="text-sm" style={{ color: 'var(--c-ash)' }}>{alloy.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patina selection */}
              <div className="mb-10">
                <p className="label-gold mb-4">2. Тип патины</p>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                  Финишное покрытие
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patinas.map(patina => {
                    const disabled = isOKN && !patina.allowedForOKN;
                    return (
                      <button
                        key={patina.id}
                        onClick={() => handlePatinaChange(patina.id)}
                        disabled={disabled}
                        className={`p-6 text-left transition-all ${
                          selectedPatina === patina.id
                            ? 'border-2'
                            : 'border'
                        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--c-gold)]'}`}
                        style={{
                          backgroundColor: 'var(--c-charcoal)',
                          borderColor: selectedPatina === patina.id ? 'var(--c-gold)' : 'var(--c-rule-light)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-lg font-semibold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                            {patina.name}
                          </p>
                          {disabled && (
                            <span className="px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-error)', color: 'white' }}>
                              ЗАПРЕЩЁН
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded" style={{ backgroundColor: patina.color, border: '1px solid var(--c-rule-light)' }}></div>
                          <span className="font-mono text-xs" style={{ color: 'var(--c-gold)' }}>
                            {patina.type === 'hot' ? 'Горячая патина ✓' : patina.type === 'chemical' ? 'Химическая ✓' : 'Имитация ✗'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dimensions */}
              <div className="mb-10">
                <p className="label-gold mb-4">3. Габариты</p>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                  Размеры (мм)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="label block mb-2">Длина</label>
                    <input
                      type="number"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                      className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                      style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Ширина</label>
                    <input
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                      className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                      style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                    />
                  </div>
                  <div>
                    <label className="label block mb-2">Высота</label>
                    <input
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                      className="w-full p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                      style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-10">
                <p className="label-gold mb-4">4. Количество</p>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                  Количество изделий (шт)
                </h3>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  className="w-full md:w-1/3 p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8" style={{ backgroundColor: 'var(--c-charcoal)', border: '1px solid var(--c-rule-light)' }}>
                <p className="label-gold mb-6">Итого</p>
                <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                  Расчёт стоимости
                </h3>

                <div className="space-y-4 mb-8">
                  {selectedAlloyData && (
                    <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--c-rule-light)' }}>
                      <span className="text-sm" style={{ color: 'var(--c-ash)' }}>Сплав</span>
                      <span className="font-mono text-sm" style={{ color: 'var(--c-parchment)' }}>{selectedAlloyData.name}</span>
                    </div>
                  )}
                  {selectedPatinaData && (
                    <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--c-rule-light)' }}>
                      <span className="text-sm" style={{ color: 'var(--c-ash)' }}>Патина</span>
                      <span className="font-mono text-sm" style={{ color: 'var(--c-parchment)' }}>{selectedPatinaData.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--c-rule-light)' }}>
                    <span className="text-sm" style={{ color: 'var(--c-ash)' }}>Габариты</span>
                    <span className="font-mono text-sm" style={{ color: 'var(--c-parchment)' }}>
                      {dimensions.length}×{dimensions.width}×{dimensions.height} мм
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--c-rule-light)' }}>
                    <span className="text-sm" style={{ color: 'var(--c-ash)' }}>Количество</span>
                    <span className="font-mono text-sm" style={{ color: 'var(--c-parchment)' }}>{quantity} шт</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="label mb-2">Ориентировочная стоимость</p>
                  <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-gold)' }}>
                    {formatCurrency(calculatePrice())}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                    Срок изготовления: {calculateDays()} дней
                  </p>
                </div>

                <button className="btn-forge w-full mb-4">
                  Оформить заказ
                </button>
                <Link to="/dashboard" className="link-forge block text-center">
                  Сохранить как черновик
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
