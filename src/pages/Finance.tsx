import { Link } from 'react-router-dom';
import { mockOrders, formatCurrency, formatDate } from '../data/dashboard';

export default function Finance() {
  const totalAmount = mockOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalPaid = mockOrders.reduce((sum, o) => sum + o.paidAmount, 0);
  const totalRemaining = totalAmount - totalPaid;

  return (
    <div>
      {/* Header */}
      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="absolute inset-0 coal-texture"></div>
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--c-smoke)' }}>
            <Link to="/dashboard" className="hover:text-[var(--c-gold)]">Личный кабинет</Link>
            <span>/</span>
            <span>Финансы</span>
          </nav>
          <p className="label-gold mb-4">Финансовый модуль</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            Счета и платежи
          </h1>
          <p className="text-base font-light" style={{ color: 'var(--c-ash)' }}>
            Поэтапная оплата: 30% → 40% → 30%. Автоматическая генерация счетов и УПД.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 forge-gradient"></div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--c-coal)', borderBottom: '1px solid var(--c-rule-gold)' }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight forge-text" style={{ fontFamily: 'var(--f-display)' }}>
                {formatCurrency(totalAmount)}
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Общая сумма заказов</p>
              <p className="label text-xs">все активные заказы</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-patina)' }}>
                {formatCurrency(totalPaid)}
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>Оплачено</p>
              <p className="label text-xs">{Math.round((totalPaid / totalAmount) * 100)}% от общей суммы</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-gold)' }}>
                {formatCurrency(totalRemaining)}
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>К оплате</p>
              <p className="label text-xs">остаток по заказам</p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders with payments */}
      <section className="py-16" style={{ backgroundColor: 'var(--c-coal)' }}>
        <div className="container">
          <p className="label-gold mb-6">Ваши заказы</p>
          <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            Детализация платежей
          </h2>

          <div className="space-y-8">
            {mockOrders.map(order => {
              const paymentStages = [
                { stage: 'Аванс', percent: 30, amount: order.totalAmount * 0.3, paid: order.paidAmount >= order.totalAmount * 0.3 },
                { stage: 'Этап 2', percent: 40, amount: order.totalAmount * 0.4, paid: order.paidAmount >= order.totalAmount * 0.7 },
                { stage: 'Окончательный', percent: 30, amount: order.totalAmount * 0.3, paid: order.paidAmount >= order.totalAmount },
              ];

              return (
                <div key={order.id} className="card-dark p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-mono text-xs mb-2" style={{ color: 'var(--c-gold)' }}>{order.number}</p>
                      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                        {order.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--c-ash)' }}>{order.objectName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Payment stages */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {paymentStages.map((payment, i) => (
                      <div
                        key={i}
                        className="p-4"
                        style={{
                          backgroundColor: 'var(--c-iron)',
                          borderLeft: `3px solid ${payment.paid ? 'var(--c-patina)' : 'var(--c-gold)'}`,
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium" style={{ color: 'var(--c-parchment)' }}>{payment.stage}</p>
                          {payment.paid ? (
                            <span className="text-xs font-mono" style={{ color: 'var(--c-patina)' }}>✓ Оплачено</span>
                          ) : (
                            <span className="text-xs font-mono" style={{ color: 'var(--c-gold)' }}>К оплате</span>
                          )}
                        </div>
                        <p className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--f-display)', color: payment.paid ? 'var(--c-patina)' : 'var(--c-gold)' }}>
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--c-ash)' }}>{payment.percent}% от суммы</p>
                      </div>
                    ))}
                  </div>

                  {/* Documents */}
                  <div className="flex gap-4">
                    <a href="#" className="link-forge">📄 Счёт на оплату</a>
                    <a href="#" className="link-forge">🧾 УПД</a>
                    <a href="#" className="link-forge">📋 Договор</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment history */}
      <section className="py-16" style={{ backgroundColor: 'var(--c-charcoal)' }}>
        <div className="container">
          <p className="label-gold mb-6">История</p>
          <h2 className="text-3xl font-bold mb-10 tracking-tight" style={{ fontFamily: 'var(--f-display)', color: 'var(--c-parchment)' }}>
            История платежей
          </h2>

          <div className="card-dark overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--c-iron)' }}>
                  <th className="text-left px-6 py-4 label">Дата</th>
                  <th className="text-left px-6 py-4 label">Заказ</th>
                  <th className="text-left px-6 py-4 label">Этап</th>
                  <th className="text-right px-6 py-4 label">Сумма</th>
                  <th className="text-center px-6 py-4 label">Статус</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid var(--c-rule-light)' }}>
                  <td className="px-6 py-4 font-mono text-sm" style={{ color: 'var(--c-ash)' }}>{formatDate('2026-01-20')}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--c-parchment)' }}>ТГ-2026-0147</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--c-ash)' }}>Аванс 30%</td>
                  <td className="px-6 py-4 text-right font-mono text-sm" style={{ color: 'var(--c-patina)' }}>{formatCurrency(375000)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-patina)', color: 'white' }}>Оплачено</span>
                  </td>
                </tr>
                <tr style={{ borderTop: '1px solid var(--c-rule-light)' }}>
                  <td className="px-6 py-4 font-mono text-sm" style={{ color: 'var(--c-ash)' }}>{formatDate('2026-02-05')}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--c-parchment)' }}>ТГ-2026-0148</td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'var(--c-ash)' }}>Аванс 30%</td>
                  <td className="px-6 py-4 text-right font-mono text-sm" style={{ color: 'var(--c-patina)' }}>{formatCurrency(840000)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-mono" style={{ backgroundColor: 'var(--c-patina)', color: 'white' }}>Оплачено</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
