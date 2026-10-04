import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockOrders, formatCurrency, formatDate } from '../data/dashboard';

export default function OrderTracker() {
  const { id } = useParams();
  const order = mockOrders.find(o => o.id === id);
  const [activeTab, setActiveTab] = useState<'tracker' | 'documents' | 'chat'>('tracker');

  if (!order) {
    return (
      <div className="container py-24 text-center">
        <p className="text-2xl mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>Заказ не найден</p>
        <Link to="/dashboard" className="link-forge">Вернуться в кабинет</Link>
      </div>
    );
  }

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in_progress': return '◉';
      case 'blocked': return '⚠';
      default: return '○';
    }
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
            <span className="font-mono">{order.number}</span>
          </nav>
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: 'var(--c-gold)' }}>{order.number}</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                {order.title}
              </h1>
              <p className="text-base" style={{ color: 'var(--c-ash)' }}>{order.objectName} · {order.objectAddress}</p>
              {order.oknStatus && (
                <span className="inline-block mt-3 px-3 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-patina)', color: 'white' }}>
                  ОКН / КГИОП
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="label mb-2">Сумма заказа</p>
              <p className="text-3xl font-bold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                {formatCurrency(order.totalAmount)}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--c-ash)' }}>Оплачено: {formatCurrency(order.paidAmount)}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>

      {/* Tabs */}
      <section style={{ backgroundColor: 'var(--c-coal)', borderBottom: '1px solid var(--c-rule-light)' }}>
        <div className="container">
          <div className="flex gap-8">
            {(['tracker', 'documents', 'chat'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 text-sm font-medium transition-colors ${activeTab === tab ? 'text-[var(--c-gold)] border-b-2 border-[var(--c-gold)]' : 'text-[var(--c-smoke)] hover:text-[var(--c-parchment)]'}`}
              >
                {tab === 'tracker' && 'Трекер заказа'}
                {tab === 'documents' && `Документы (${order.documents.length})`}
                {tab === 'chat' && `Чат (${order.chatMessages.length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          {/* Tracker */}
          {activeTab === 'tracker' && (
            <div>
              <p className="label-gold mb-6">Этапы производства</p>
              <h2 className="text-2xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                Прогресс заказа
              </h2>
              <div className="space-y-0">
                {order.stages.map((stage, i) => (
                  <div key={stage.id} className="flex gap-6 pb-8" style={{ borderBottom: i < order.stages.length - 1 ? '1px solid var(--c-rule-light)' : 'none' }}>
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                        style={{ backgroundColor: getStageColor(stage.status), color: 'var(--c-coal)' }}
                      >
                        {getStageIcon(stage.status)}
                      </div>
                      {i < order.stages.length - 1 && (
                        <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: stage.status === 'completed' ? 'var(--c-patina)' : 'var(--c-rule-light)' }}></div>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                          {stage.title}
                        </h3>
                        {stage.completedAt && (
                          <span className="font-mono text-xs" style={{ color: 'var(--c-patina)' }}>
                            {formatDate(stage.completedAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-4" style={{ color: 'var(--c-ash)' }}>{stage.description}</p>
                      {stage.blocked && (
                        <div className="p-4 mb-4" style={{ backgroundColor: 'rgba(166, 61, 47, 0.1)', borderLeft: '3px solid var(--c-error)' }}>
                          <p className="text-sm font-medium" style={{ color: 'var(--c-error)' }}>⚠ {stage.blockedReason}</p>
                        </div>
                      )}
                      {stage.reportUrl && (
                        <a href={stage.reportUrl} className="link-forge">
                          {stage.reportType === 'photo' && '📷 Смотреть фотоотчёт'}
                          {stage.reportType === 'video' && '🎥 Смотреть видеоотчёт'}
                          {stage.reportType === 'document' && '📄 Открыть документ'}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div>
              <p className="label-gold mb-6">Цифровая папка объекта</p>
              <h2 className="text-2xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                Документы для КГИОП
              </h2>
              <div className="space-y-3">
                {order.documents.map(doc => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    className="flex items-center justify-between p-6 card-dark hover:border-[var(--c-gold-deep)] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">
                        {doc.type === 'passport' && '📋'}
                        {doc.type === 'certificate' && '📜'}
                        {doc.type === 'drawing' && '📐'}
                        {doc.type === 'act' && '📄'}
                        {doc.type === 'invoice' && '💳'}
                        {doc.type === 'upd' && '🧾'}
                      </div>
                      <div>
                        <p className="text-base font-medium mb-1" style={{ color: 'var(--c-parchment)' }}>{doc.title}</p>
                        <p className="font-mono text-xs" style={{ color: 'var(--c-ash)' }}>
                          {formatDate(doc.uploadedAt)}
                          {doc.required && <span style={{ color: 'var(--c-gold)' }}> · Обязательный</span>}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm" style={{ color: 'var(--c-gold)' }}>↗ Скачать</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Chat */}
          {activeTab === 'chat' && (
            <div>
              <p className="label-gold mb-6">Коммуникации</p>
              <h2 className="text-2xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                Чат по заказу
              </h2>
              <div className="card-dark p-6 mb-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className="space-y-6">
                  {order.chatMessages.map(msg => (
                    <div key={msg.id} className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: msg.authorRole === 'technologist' ? 'var(--c-gold)' : 'var(--c-patina)',
                          color: 'var(--c-coal)',
                        }}
                      >
                        {msg.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-2">
                          <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>{msg.author}</p>
                          <span className="font-mono text-xs" style={{ color: 'var(--c-smoke)' }}>
                            {msg.authorRole === 'technologist' ? 'Технолог' : msg.authorRole === 'architect' ? 'Архитектор' : 'Менеджер'}
                          </span>
                          <span className="font-mono text-xs" style={{ color: 'var(--c-smoke)' }}>
                            {new Date(msg.timestamp).toLocaleString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--c-ash)' }}>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Написать сообщение..."
                  className="flex-1 p-4 bg-transparent border focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ borderColor: 'var(--c-steel)', color: 'var(--c-parchment)' }}
                />
                <button className="btn-forge">Отправить</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
