import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockOrders, formatCurrency, formatDate } from '../data/dashboard';

export default function CMS() {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]?.id || '');

  // Проверка доступа (только для менеджеров и технологов)
  if (user?.role !== 'manager' && user?.role !== 'technologist') {
    return (
      <div className="container py-24 text-center">
        <p className="text-2xl mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
          Доступ запрещён
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--c-ash)' }}>
          CMS доступна только менеджерам и технологам
        </p>
        <Link to="/dashboard" className="link-forge">Вернуться в кабинет</Link>
      </div>
    );
  }

  const order = mockOrders.find(o => o.id === selectedOrder);

  // Расчёт позиций для диаграммы Ганта
  const calculateGanttPosition = (stageIndex: number, totalStages: number) => {
    const stageDuration = 100 / totalStages;
    return {
      left: `${stageIndex * stageDuration}%`,
      width: `${stageDuration}%`,
    };
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--c-patina)';
      case 'in_progress': return 'var(--c-gold)';
      case 'blocked': return 'var(--c-error)';
      default: return 'var(--c-smoke)';
    }
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
            <span>CMS</span>
          </nav>
          <p className="label-gold mb-4">Система управления</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            CMS Мануфактуры
          </h1>
          <p className="text-base font-light" style={{ color: 'var(--c-ash)' }}>
            Управление заказами, производством и документацией
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>

      {/* Order selector */}
      <section className="py-8" style={{ backgroundColor: 'var(--c-coal)', borderBottom: '1px solid var(--c-rule-light)' }}>
        <div className="container">
          <div className="flex items-center gap-4">
            <label className="label">Выберите заказ:</label>
            <select
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              className="p-3 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
              style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
            >
              {mockOrders.map(o => (
                <option key={o.id} value={o.id} style={{ color: 'var(--c-ink)' }}>
                  {o.number} - {o.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {order && (
        <>
          {/* Gantt Chart */}
          <section className="py-16" style={{ backgroundColor: 'var(--c-coal)' }}>
            <div className="container">
              <p className="label-gold mb-6">Диаграмма Ганта</p>
              <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                Временная шкала производства
              </h2>

              <div className="card-dark p-8 overflow-x-auto">
                {/* Timeline header */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono" style={{ color: 'var(--c-smoke)' }}>
                    <span>Начало: {formatDate(order.createdAt)}</span>
                    <span>Срок: {formatDate(order.deadline)}</span>
                  </div>
                </div>

                {/* Gantt bars */}
                <div className="space-y-4">
                  {order.stages.map((stage, index) => {
                    const position = calculateGanttPosition(index, order.stages.length);
                    return (
                      <div key={stage.id} className="flex items-center gap-4">
                        <div className="w-48 shrink-0">
                          <p className="text-sm font-medium mb-1" style={{ color: 'var(--c-parchment)' }}>
                            {stage.title}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--c-ash)' }}>
                            Этап {index + 1} из {order.stages.length}
                          </p>
                        </div>
                        <div className="flex-1 relative h-12" style={{ backgroundColor: 'var(--c-iron)' }}>
                          <div
                            className="absolute top-0 h-full flex items-center px-4 transition-all"
                            style={{
                              left: position.left,
                              width: position.width,
                              backgroundColor: getStageColor(stage.status),
                              opacity: stage.status === 'pending' ? 0.3 : 1,
                            }}
                          >
                            <span className="text-xs font-medium text-white truncate">
                              {stage.status === 'completed' && '✓ '}
                              {stage.status === 'in_progress' && '◉ '}
                              {stage.status === 'blocked' && '⚠ '}
                              {stage.title}
                            </span>
                          </div>
                        </div>
                        <div className="w-32 shrink-0 text-right">
                          {stage.completedAt && (
                            <p className="text-xs font-mono" style={{ color: 'var(--c-patina)' }}>
                              {formatDate(stage.completedAt)}
                            </p>
                          )}
                          {stage.status === 'in_progress' && (
                            <p className="text-xs font-mono" style={{ color: 'var(--c-gold)' }}>
                              В работе
                            </p>
                          )}
                          {stage.status === 'blocked' && (
                            <p className="text-xs font-mono" style={{ color: 'var(--c-error)' }}>
                              Заблокирован
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 flex gap-6" style={{ borderTop: '1px solid var(--c-rule-light)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--c-patina)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--c-ash)' }}>Выполнено</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--c-gold)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--c-ash)' }}>В работе</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--c-smoke)', opacity: 0.3 }}></div>
                    <span className="text-xs" style={{ color: 'var(--c-ash)' }}>Ожидает</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--c-error)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--c-ash)' }}>Заблокирован</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Order details */}
          <section className="py-16" style={{ backgroundColor: 'var(--c-charcoal)' }}>
            <div className="container">
              <p className="label-gold mb-6">Информация о заказе</p>
              <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                {order.number}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card-dark p-8">
                  <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                    Основная информация
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="label mb-1">Название</p>
                      <p className="text-sm" style={{ color: 'var(--c-parchment)' }}>{order.title}</p>
                    </div>
                    <div>
                      <p className="label mb-1">Объект</p>
                      <p className="text-sm" style={{ color: 'var(--c-parchment)' }}>{order.objectName}</p>
                      <p className="text-xs" style={{ color: 'var(--c-ash)' }}>{order.objectAddress}</p>
                    </div>
                    <div>
                      <p className="label mb-1">Заказчик</p>
                      <p className="text-sm" style={{ color: 'var(--c-parchment)' }}>{order.customer}</p>
                    </div>
                    <div>
                      <p className="label mb-1">Сумма</p>
                      <p className="text-lg font-bold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-gold)' }}>
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-dark p-8">
                  <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                    Статистика
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="label mb-2">Прогресс производства</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--c-steel)' }}>
                          <div
                            className="h-full"
                            style={{
                              width: `${(order.stages.filter(s => s.status === 'completed').length / order.stages.length) * 100}%`,
                              background: 'linear-gradient(90deg, var(--c-gold-deep), var(--c-gold-rich))',
                            }}
                          ></div>
                        </div>
                        <span className="font-mono text-sm" style={{ color: 'var(--c-gold)' }}>
                          {Math.round((order.stages.filter(s => s.status === 'completed').length / order.stages.length) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="label mb-2">Оплата</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--c-steel)' }}>
                          <div
                            className="h-full"
                            style={{
                              width: `${(order.paidAmount / order.totalAmount) * 100}%`,
                              backgroundColor: 'var(--c-patina)',
                            }}
                          ></div>
                        </div>
                        <span className="font-mono text-sm" style={{ color: 'var(--c-patina)' }}>
                          {Math.round((order.paidAmount / order.totalAmount) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="label mb-1">Документов</p>
                      <p className="text-sm" style={{ color: 'var(--c-parchment)' }}>{order.documents.length} файлов</p>
                    </div>
                    <div>
                      <p className="label mb-1">Сообщений в чате</p>
                      <p className="text-sm" style={{ color: 'var(--c-parchment)' }}>{order.chatMessages.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
