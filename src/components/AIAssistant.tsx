import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, catalogMeta } from '../data/catalog';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  content: React.ReactNode;
};

type QuickAction = {
  label: string;
  query: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Подобрать изделие', query: 'Подобрать изделие' },
  { label: 'Вопрос по ГОСТу', query: 'Какие ГОСТы вы используете?' },
  { label: 'Согласование КГИОП', query: 'Как происходит согласование с КГИОП?' },
  { label: 'Сроки изготовления', query: 'Какие сроки изготовления?' },
];

function generateResponse(input: string): React.ReactNode {
  const q = input.toLowerCase();

  if (q.includes('подобрать') || q.includes('подбор') || q.includes('какие изделия')) {
    const types = Object.entries(catalogMeta.types).map(([key, label]) => (
      <li key={key} style={{ marginBottom: 4 }}>
        <Link to={`/catalog?type=${key}`} style={{ color: 'var(--c-gold)' }}>→ {label}</Link>
      </li>
    ));
    return (
      <>
        <p style={{ marginBottom: 8 }}>В нашем каталоге представлены следующие типы фурнитуры:</p>
        <ul style={{ paddingLeft: 16 }}>{types}</ul>
        <p style={{ marginTop: 8 }}>Уточните, что именно вас интересует — эпоха, материал, тип изделия — и я помогу подобрать конкретные позиции.</p>
      </>
    );
  }

  if (q.includes('ручк') || q.includes('скоб') || q.includes('кноб')) {
    const handles = products.filter(p => p.type === 'handles').slice(0, 3);
    return (
      <>
        <p style={{ marginBottom: 8 }}>У нас есть несколько вариантов ручек:</p>
        {handles.map(h => (
          <div key={h.id} style={{ marginBottom: 8, padding: '8px 12px', backgroundColor: 'var(--c-iron)', borderLeft: '2px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} style={{ color: 'var(--c-gold)', fontWeight: 500 }}>{h.title}</Link>
            <div style={{ fontSize: 12, color: 'var(--c-ash)', marginTop: 2 }}>
              {h.alloy} · {h.epoch}
            </div>
          </div>
        ))}
        <p style={{ marginTop: 8 }}>Все изделия отливаются из латуни Л63 по ГОСТ 17711-93. Хотите посмотреть полный каталог ручек?</p>
      </>
    );
  }

  if (q.includes('петл')) {
    const hinges = products.filter(p => p.type === 'hinges');
    return (
      <>
        <p style={{ marginBottom: 8 }}>В каталоге представлены кованые петли:</p>
        {hinges.map(h => (
          <div key={h.id} style={{ marginBottom: 8, padding: '8px 12px', backgroundColor: 'var(--c-iron)', borderLeft: '2px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} style={{ color: 'var(--c-gold)', fontWeight: 500 }}>{h.title}</Link>
            <div style={{ fontSize: 12, color: 'var(--c-ash)', marginTop: 2 }}>{h.alloy} · {h.epoch}</div>
          </div>
        ))}
      </>
    );
  }

  if (q.includes('шпингалет') || q.includes('крепмон')) {
    const items = products.filter(p => p.type === 'espagnolettes');
    return (
      <>
        <p style={{ marginBottom: 8 }}>Доступны шпингалеты латунные:</p>
        {items.map(h => (
          <div key={h.id} style={{ marginBottom: 8, padding: '8px 12px', backgroundColor: 'var(--c-iron)', borderLeft: '2px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} style={{ color: 'var(--c-gold)', fontWeight: 500 }}>{h.title}</Link>
            <div style={{ fontSize: 12, color: 'var(--c-ash)', marginTop: 2 }}>{h.alloy} · {h.epoch}</div>
          </div>
        ))}
      </>
    );
  }

  if (q.includes('решётк') || q.includes('решетк')) {
    const items = products.filter(p => p.type === 'grilles');
    return (
      <>
        <p style={{ marginBottom: 8 }}>Кованые решётки по архивным чертежам:</p>
        {items.map(h => (
          <div key={h.id} style={{ marginBottom: 8, padding: '8px 12px', backgroundColor: 'var(--c-iron)', borderLeft: '2px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} style={{ color: 'var(--c-gold)', fontWeight: 500 }}>{h.title}</Link>
            <div style={{ fontSize: 12, color: 'var(--c-ash)', marginTop: 2 }}>{h.alloy} · {h.epoch}</div>
          </div>
        ))}
      </>
    );
  }

  if (q.includes('гост') || q.includes('норматив')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Мы работаем в соответствии со следующими нормативами:</p>
        <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li><strong style={{ color: 'var(--c-gold)' }}>ГОСТ Р 55567-2013</strong> — реставрация памятников наследия</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>Р-13.19.15</strong> — руководство по реставрации металлических конструкций</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>ГОСТ 17711-93</strong> — сплавы медно-цинковые (латуни)</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>Регламент КГИОП СПб</strong> — порядок согласования проектной документации</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>ФЗ-73</strong> — об объектах культурного наследия</li>
        </ul>
        <p>Подробнее — в разделе <Link to="/docs" style={{ color: 'var(--c-gold)' }}>Документация</Link>.</p>
      </>
    );
  }

  if (q.includes('кгип') || q.includes('согласован')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Процесс согласования с КГИОП включает 7 этапов:</p>
        <ol style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li>Архивное исследование прототипа</li>
          <li>Натурное обследование объекта</li>
          <li>3D-моделирование / чертёж</li>
          <li>Изготовление прототипа</li>
          <li>Подача документов в КГИОП</li>
          <li>Получение положительного заключения</li>
          <li>Производство партии и паспортизация</li>
        </ol>
        <p>Стандартный срок согласования — <strong style={{ color: 'var(--c-gold)' }}>30 рабочих дней</strong>. При необходимости экспертизы — до 60 дней.</p>
        <p style={{ marginTop: 8 }}>Подробнее о методологии — на странице <Link to="/about" style={{ color: 'var(--c-gold)' }}>Мануфактура</Link>.</p>
      </>
    );
  }

  if (q.includes('срок') || q.includes('когда') || q.includes('долго')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Ориентировочные сроки:</p>
        <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li>Изделия из каталога (в наличии) — <strong style={{ color: 'var(--c-gold)' }}>от 14 дней</strong></li>
          <li>Изготовление по прототипу — <strong style={{ color: 'var(--c-gold)' }}>30–60 дней</strong></li>
          <li>Согласование с КГИОП — <strong style={{ color: 'var(--c-gold)' }}>30 рабочих дней</strong></li>
          <li>Крупные партии (от 100 шт.) — индивидуально</li>
        </ul>
        <p>Минимальный срок заказа — 30 дней с момента согласования.</p>
      </>
    );
  }

  if (q.includes('материал') || q.includes('сплав') || q.includes('латун') || q.includes('л63') || q.includes('цам')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Мы используем только исторически обоснованные сплавы:</p>
        <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li><strong style={{ color: 'var(--c-gold)' }}>Латунь Л63</strong> (ГОСТ 17711-93) — основное сырьё</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>ЛС59-1</strong> — для сложных форм</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>Сталь Ст3</strong> — для кованых элементов</li>
          <li><strong style={{ color: 'var(--c-gold)' }}>Чугун ЧХН</strong> — для литья</li>
        </ul>
        <p>ЦАМ (цинковые сплавы) <strong style={{ color: 'var(--c-error)' }}>не используется</strong> — он не соответствует нормативам КГИОП и не имеет исторической преемственности.</p>
        <p style={{ marginTop: 8 }}>На каждую партию выдаётся паспорт сплава с результатами спектрометрии.</p>
      </>
    );
  }

  if (q.includes('цен') || q.includes('стоим') || q.includes('сколько')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Стоимость рассчитывается индивидуально для каждого проекта и зависит от:</p>
        <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li>Сложности изделия и количества</li>
          <li>Требуемого сплава и покрытия</li>
          <li>Необходимости архивного исследования</li>
          <li>Согласования с КГИОП</li>
        </ul>
        <p>Чтобы получить точный расчёт, оставьте заявку через <Link to="/order" style={{ color: 'var(--c-gold)' }}>форму расчёта</Link> — технолог свяжется с вами в течение рабочего дня.</p>
      </>
    );
  }

  if (q.includes('контакт') || q.includes('менеджер') || q.includes('связ') || q.includes('телефон') || q.includes('позвон')) {
    return (
      <>
        <p style={{ marginBottom: 8 }}>Связаться с нами можно любым удобным способом:</p>
        <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
          <li>Телефон: <a href="tel:+78121234567" style={{ color: 'var(--c-gold)' }}>+7 (812) 123-45-67</a></li>
          <li>Email: <a href="mailto:info@tigeliGorn.ru" style={{ color: 'var(--c-gold)' }}>info@tigeliGorn.ru</a></li>
          <li>Адрес: СПб, ул. Кузнечная, 12</li>
        </ul>
        <p>Режим работы: Пн–Пт, 09:00–18:00 MSK.</p>
        <p style={{ marginTop: 8 }}>Или оставьте заявку — <Link to="/order" style={{ color: 'var(--c-gold)' }}>рассчитать по проекту КГИОП</Link>.</p>
      </>
    );
  }

  if (q.includes('привет') || q.includes('здравств') || q.includes('добр')) {
    return (
      <>
        <p>Здравствуйте! Рад помочь вам с подбором реставрационной фурнитуры.</p>
        <p style={{ marginTop: 8 }}>Могу проконсультировать по:</p>
        <ul style={{ paddingLeft: 16, marginTop: 4 }}>
          <li>Изделиям из каталога</li>
          <li>Нормативам и ГОСТам</li>
          <li>Процессу согласования с КГИОП</li>
          <li>Материалам и сплавам</li>
          <li>Срокам изготовления</li>
        </ul>
        <p style={{ marginTop: 8 }}>Что вас интересует?</p>
      </>
    );
  }

  if (q.includes('спасиб') || q.includes('благодар')) {
    return <p>Всегда рад помочь! Если появятся ещё вопросы — обращайтесь. Успешной работы над проектом!</p>;
  }

  return (
    <>
      <p>Я специализируюсь на вопросах реставрационной фурнитуры и нормативов КГИОП. Могу помочь с:</p>
      <ul style={{ paddingLeft: 16, marginTop: 8 }}>
        <li>Подбором изделий из каталога</li>
        <li>Консультацией по ГОСТам</li>
        <li>Процессом согласования</li>
        <li>Материалами и сплавами</li>
        <li>Сроками изготовления</li>
      </ul>
      <p style={{ marginTop: 8 }}>Уточните вопрос, или <Link to="/contacts" style={{ color: 'var(--c-gold)' }}>свяжитесь с менеджером</Link> напрямую.</p>
    </>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: (
        <>
          <p>Здравствуйте! Я — AI-консультант мануфактуры «Тигель & Горн».</p>
          <p style={{ marginTop: 8 }}>Помогу подобрать фурнитуру для вашего проекта ОКН, проконсультирую по нормативам КГИОП и отвечу на технические вопросы.</p>
          <p style={{ marginTop: 8 }}>Что вас интересует?</p>
        </>
      ),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.query);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="no-print"
        aria-label={isOpen ? 'Закрыть помощника' : 'Открыть AI-помощника'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--c-gold-deep), var(--c-gold), var(--c-gold-rich))',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(184, 134, 11, 0.35), 0 0 60px rgba(184, 134, 11, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(184, 134, 11, 0.5), 0 0 80px rgba(184, 134, 11, 0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(184, 134, 11, 0.35), 0 0 60px rgba(184, 134, 11, 0.15)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-coal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            width: 'calc(100% - 48px)',
            maxWidth: 420,
            height: 600,
            maxHeight: 'calc(100vh - 140px)',
            backgroundColor: 'var(--c-charcoal)',
            border: '1px solid var(--c-rule-light)',
            borderRadius: 8,
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(184, 134, 11, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 60,
            overflow: 'hidden',
          }}
          role="dialog"
          aria-label="AI-консультант"
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--c-rule-light)',
              background: 'linear-gradient(135deg, var(--c-iron) 0%, var(--c-charcoal) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--c-gold-deep), var(--c-gold-rich))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-coal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, color: 'var(--c-parchment)' }}>
                  AI-консультант
                </div>
                <div style={{ fontSize: 11, color: 'var(--c-ash)', fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Мануфактура «Тигель & Горн»
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    lineHeight: 1.5,
                    backgroundColor: msg.role === 'user' ? 'var(--c-gold-deep)' : 'var(--c-iron)',
                    color: msg.role === 'user' ? 'var(--c-coal)' : 'var(--c-parchment)',
                    border: msg.role === 'assistant' ? '1px solid var(--c-rule-light)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 8,
                    backgroundColor: 'var(--c-iron)',
                    border: '1px solid var(--c-rule-light)',
                    display: 'flex',
                    gap: 4,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--c-gold)', animation: 'pulse 1.4s infinite' }}></span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--c-gold)', animation: 'pulse 1.4s infinite 0.2s' }}></span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--c-gold)', animation: 'pulse 1.4s infinite 0.4s' }}></span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div
              style={{
                padding: '0 20px 12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action)}
                  style={{
                    padding: '6px 12px',
                    fontSize: 11,
                    fontFamily: 'var(--f-mono)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--c-gold)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--c-gold-deep)',
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--c-gold-deep)';
                    e.currentTarget.style.color = 'var(--c-coal)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--c-gold)';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--c-rule-light)',
              backgroundColor: 'var(--c-iron)',
              display: 'flex',
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Задайте вопрос..."
              style={{
                flex: 1,
                padding: '10px 14px',
                backgroundColor: 'var(--c-charcoal)',
                border: '1px solid var(--c-rule-light)',
                borderRadius: 4,
                color: 'var(--c-parchment)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--c-gold-deep)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--c-rule-light)'; }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                padding: '0 16px',
                backgroundColor: input.trim() ? 'var(--c-gold)' : 'var(--c-steel)',
                color: input.trim() ? 'var(--c-coal)' : 'var(--c-smoke)',
                border: 'none',
                borderRadius: 4,
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s ease',
              }}
            >
              →
            </button>
          </form>

          <style>{`
            @keyframes pulse {
              0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
              30% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
