import { Link } from 'react-router-dom';
import { currentUser, mockOrders, formatCurrency, formatDate } from '../data/dashboard';

export default function Dashboard() {
  const getStageProgress = (stages: any[]) => {
    const completed = stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / stages.length) * 100);
  };

  const getPaymentProgress = (paid: number, total: number) => {
    return Math.round((paid / total) * 100);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--c-smoke)' }}>
            <Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Главная</Link>
            <span>/</span>
            <span>Личный кабинет</span>
          </nav>
          <p className="label-gold mb-4">Добро пожаловать</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            {currentUser.name}
          </h1>
          <p className="text-base font-light" style={{ color: 'var(--c-ash)' }}>
            {currentUser.company} · {currentUser.role === 'architect' ? 'ГИП / Архитектор' : currentUser.role === 'customer' ? 'Заказчик' : 'Сотрудник'}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--c-coal)', borderBottom: '1px solid var(--c-rule-gold)' }}>
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>{mockOrders.length}</div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Активных заказов</p>
              <p className="label text-xs">в работе</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>{formatCurrency(mockOrders.reduce((sum, o) => sum + o.totalAmount, 0))}</div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Общая сумма</p>
              <p className="label text-xs">все заказы</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>{mockOrders.reduce((sum, o) => sum + o.documents.length, 0)}</div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Документов</p>
              <p className="label text-xs">в папках объектов</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>3</div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Объекта ОКН</p>
              <p className="label text-xs">под вашим контролем</p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="py-16" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="label-gold mb-4">Ваши заказы</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Активные заказы</h2>
            </div>
            <Link to="/dashboard/configurator" className="btn-forge">Новый заказ</Link>
          </div>

          <div className="space-y-6">
            {mockOrders.map(order => (
              <Link
                key={order.id}
                to={`/dashboard/order/${order.id}`}
                className="block card-dark p-8 hover:border-[var(--c-gold-deep)] transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Order info */}
                  <div className="md:col-span-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-mono text-xs mb-2" style={{ color: 'var(--c-gold)' }}>{order.number}</p>
                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                          {order.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--c-ash)' }}>{order.objectName}</p>
                        {order.oknStatus && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-patina)', color: 'white' }}>
                            ОКН / КГИОП
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="md:col-span-4">
                    <div className="mb-4">
                      <p className="label mb-2">Прогресс производства</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--c-steel)' }}>
                          <div
                            className="h-full transition-all"
                            style={{
                              width: `${getStageProgress(order.stages)}%`,
                              background: 'linear-gradient(90deg, var(--c-gold-deep), var(--c-gold-rich))',
                            }}
                          ></div>
                        </div>
                        <span className="font-mono text-sm" style={{ color: 'var(--c-gold)' }}>{getStageProgress(order.stages)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="label mb-2">Оплата</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--c-steel)' }}>
                          <div
                            className="h-full transition-all"
                            style={{
                              width: `${getPaymentProgress(order.paidAmount, order.totalAmount)}%`,
                              backgroundColor: 'var(--c-patina)',
                            }}
                          ></div>
                        </div>
                        <span className="font-mono text-sm" style={{ color: 'var(--c-patina)' }}>{getPaymentProgress(order.paidAmount, order.totalAmount)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="md:col-span-3 text-right">
                    <p className="label mb-2">Срок</p>
                    <p className="text-sm mb-4" style={{ color: 'var(--c-parchment)' }}>{formatDate(order.deadline)}</p>
                    <p className="label mb-2">Сумма</p>
                    <p className="text-lg font-semibold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="py-16" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="container">
          <p className="label-gold mb-6">Быстрые действия</p>
          <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Инструменты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/dashboard/configurator" className="card-dark p-8 group">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>
                Конфигуратор изделий
              </h3>
              <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                Настройте параметры нового изделия: сплав, патина, габариты. Автоматический расчёт стоимости.
              </p>
            </Link>
            <Link to="/dashboard/object-folder" className="card-dark p-8 group">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>
                Папка объекта
              </h3>
              <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                Паспорта сплавов, исторические справки, акты скрытых работ. Всё для КГИОП в одном месте.
              </p>
            </Link>
            <Link to="/dashboard/finance" className="card-dark p-8 group">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--c-gold)] transition-colors" style={{ fontFamily: 'var(--f-display)' }}>
                Финансы
              </h3>
              <p className="text-sm" style={{ color: 'var(--c-ash)' }}>
                Счета, УПД, история платежей. Поэтапная оплата 30% → 40% → 30%.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
