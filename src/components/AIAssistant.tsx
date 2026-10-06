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

type ConversationContext = {
  clientType?: 'architect' | 'customer' | 'restorer' | 'unknown';
  projectName?: string;
  objectType?: string;
  epoch?: string;
  quantity?: string;
  deadline?: string;
  budget?: string;
  contactInfo?: string;
  currentTopic?: string;
  lastUserMessage?: string;
  messageCount: number;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Подобрать изделие', query: 'Мне нужна помощь с подбором' },
  { label: 'Вопрос по ГОСТу', query: 'Расскажите про нормативы' },
  { label: 'Согласование КГИОП', query: 'Как согласовать с КГИОП?' },
  { label: 'Сроки и стоимость', query: 'Сколько времени и денег нужно?' },
];

// Глобальный контекст диалога
let context: ConversationContext = {
  messageCount: 0,
};

// Утилиты для естественной речи
const greetings = [
  'Здравствуйте! Рад вас видеть.',
  'Добрый день! Чем могу помочь?',
  'Здравствуйте! Слушаю вас.',
  'Приветствую! Какой у вас проект?',
];

const acknowledgments = [
  'Понимаю вас.',
  'Отлично, спасибо за информацию.',
  'Хорошо, учту это.',
  'Принято.',
  'Ясно, давайте разберёмся.',
];

const transitions = [
  'Теперь давайте уточним...',
  'Следующий важный момент...',
  'И ещё один вопрос...',
  'Чтобы я мог лучше помочь, расскажите...',
];

// Определение типа клиента по контексту
function detectClientType(message: string): 'architect' | 'customer' | 'restorer' | 'unknown' {
  const lower = message.toLowerCase();
  if (lower.includes('гип') || lower.includes('архитектор') || lower.includes('проект') || lower.includes('чертеж')) {
    return 'architect';
  }
  if (lower.includes('снабжение') || lower.includes('закупк') || lower.includes('смет') || lower.includes('бюджет')) {
    return 'customer';
  }
  if (lower.includes('реставрац') || lower.includes('окн') || lower.includes('кгип') || lower.includes('памятник')) {
    return 'restorer';
  }
  return 'unknown';
}

// Генерация естественного ответа
function generateResponse(input: string): React.ReactNode {
  const q = input.toLowerCase();
  context.messageCount++;
  context.lastUserMessage = input;

  // Определяем тип клиента при первом сообщении
  if (context.messageCount === 1) {
    context.clientType = detectClientType(input);
  }

  // Приветствие и начало диалога
  if (context.messageCount === 1 && (q.includes('здравств') || q.includes('привет') || q.includes('добрый'))) {
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return (
      <>
        <p>{greeting}</p>
        <p className="mt-2">Меня зовут Алексей, я технолог мануфактуры «Тигель и Горн». Работаю с реставрационной фурнитурой уже 12 лет.</p>
        <p className="mt-2">Расскажите, пожалуйста, над каким проектом вы сейчас работаете? Это поможет мне лучше понять ваши потребности.</p>
      </>
    );
  }

  // Сбор информации о проекте
  if (!context.objectType && (q.includes('подобр') || q.includes('помощ') || q.includes('нужн') || q.includes('хочу'))) {
    return (
      <>
        <p>{acknowledgments[Math.floor(Math.random() * acknowledgments.length)]}</p>
        <p className="mt-2">Чтобы я мог предложить вам наиболее подходящие решения, расскажите немного о вашем объекте.</p>
        <p className="mt-2">Это храм, усадьба, музей или другое здание? И к какому историческому периоду оно относится?</p>
      </>
    );
  }

  if (!context.objectType && context.messageCount > 2) {
    context.objectType = input;
    return (
      <>
        <p>{acknowledgments[Math.floor(Math.random() * acknowledgments.length)]}</p>
        <p className="mt-2">{transitions[Math.floor(Math.random() * transitions.length)]}</p>
        <p className="mt-2">Какой тип фурнитуры вам нужен? Мы специализируемся на дверных ручках, петлях, шпингалетах, решётках, наличниках и скобах.</p>
      </>
    );
  }

  // Вопросы по ГОСТам и нормативам
  if (q.includes('гост') || q.includes('норматив') || q.includes('стандарт')) {
    return (
      <>
        <p>Отличный вопрос! Мы работаем строго в соответствии с нормативной базой.</p>
        <p className="mt-2">Основные документы, которые мы используем:</p>
        <ul className="mt-2 space-y-1 text-sm" style={{ paddingLeft: '20px' }}>
          <li>• <strong>ГОСТ Р 55567-2013</strong> — реставрация памятников наследия</li>
          <li>• <strong>Р-13.19.15</strong> — руководство по реставрации металлических конструкций</li>
          <li>• <strong>ГОСТ 17711-93</strong> — сплавы медно-цинковые (латуни)</li>
          <li>• <strong>Регламент КГИОП СПб</strong> — порядок согласования проектной документации</li>
          <li>• <strong>ФЗ-73</strong> — об объектах культурного наследия</li>
        </ul>
        <p className="mt-3">Для каждого изделия мы готовим полный пакет документов: паспорт сплава, историческую справку, протокол патинирования. Всё это необходимо для согласования с КГИОП.</p>
        <p className="mt-2">У вас есть конкретный объект, для которого нужна фурнитура?</p>
      </>
    );
  }

  // Вопросы по согласованию с КГИОП
  if (q.includes('кгип') || q.includes('согласован') || q.includes('документ')) {
    return (
      <>
        <p>Согласование с КГИОП — это важный этап, и мы полностью берём его на себя.</p>
        <p className="mt-2">Процесс выглядит так:</p>
        <ol className="mt-2 space-y-1 text-sm" style={{ paddingLeft: '20px' }}>
          <li>1. Архивное исследование — находим исторические аналоги в РГИА, ГАРФ, Эрмитаже</li>
          <li>2. Натурное обследование — выезжаем на объект, делаем обмеры</li>
          <li>3. 3D-моделирование — создаём точную модель или чертёж</li>
          <li>4. Изготовление прототипа — проверяем соответствие оригиналу</li>
          <li>5. Подача документов в КГИОП — готовим полный пакет</li>
          <li>6. Получение заключения — обычно 30 рабочих дней</li>
          <li>7. Производство партии и паспортизация</li>
        </ol>
        <p className="mt-3">Мы работаем с КГИОП уже 12 лет и знаем все нюансы. За это время согласовали 47 объектов.</p>
        <p className="mt-2">Расскажите подробнее о вашем проекте — какой объект, что именно нужно восстановить?</p>
      </>
    );
  }

  // Вопросы по срокам и стоимости
  if (q.includes('срок') || q.includes('время') || q.includes('долго') || q.includes('стоим') || q.includes('цен') || q.includes('деньг')) {
    return (
      <>
        <p>Понимаю, сроки и бюджет — это всегда важно.</p>
        <p className="mt-2">По срокам: минимальный срок изготовления — 30 дней с момента согласования. Но обычно мы закладываем 45-60 дней, чтобы учесть все этапы: исследование, производство, патинирование, ОТК.</p>
        <p className="mt-2">По стоимости: она зависит от нескольких факторов — типа изделия, сплава, количества, сложности патинирования. Например, ручка-скоба из латуни Л63 с горячей патиной будет стоить от 12 500 рублей за штуку.</p>
        <p className="mt-2">Чтобы я мог дать вам более точную оценку, расскажите:</p>
        <ul className="mt-2 space-y-1 text-sm" style={{ paddingLeft: '20px' }}>
          <li>• Какой тип фурнитуры вам нужен?</li>
          <li>• Примерное количество?</li>
          <li>• Есть ли исторические прототипы или архивные материалы?</li>
        </ul>
      </>
    );
  }

  // Вопросы по материалам
  if (q.includes('материал') || q.includes('сплав') || q.includes('латун') || q.includes('бронз')) {
    return (
      <>
        <p>Мы используем только исторически обоснованные сплавы — это принципиальная позиция.</p>
        <p className="mt-2">Основные материалы:</p>
        <ul className="mt-2 space-y-1 text-sm" style={{ paddingLeft: '20px' }}>
          <li>• <strong>Латунь Л63</strong> (ГОСТ 17711-93) — основной сплав для литья, имеет историческую преемственность</li>
          <li>• <strong>ЛС59-1</strong> — свинцовая латунь для сложных форм</li>
          <li>• <strong>Сталь Ст3</strong> — для кованых элементов</li>
          <li>• <strong>Чугун ЧХН</strong> — для чугунного литья</li>
        </ul>
        <p className="mt-3">Важно: мы принципиально не используем ЦАМ (цинковые сплавы) — они не соответствуют нормативам КГИОП и не имеют исторической преемственности. Это касается только объектов культурного наследия.</p>
        <p className="mt-2">На каждую партию мы выдаём паспорт сплава с результатами спектрометрии. Это обязательное требование для согласования.</p>
        <p className="mt-2">Для вашего проекта какой сплав рассматриваете?</p>
      </>
    );
  }

  // Подбор конкретных изделий
  if (q.includes('ручк') || q.includes('скоб') || q.includes('кноб')) {
    const handles = products.filter(p => p.type === 'handles').slice(0, 3);
    return (
      <>
        <p>Ручки — это наша специализация. У нас есть несколько вариантов, которые могут подойти.</p>
        <p className="mt-2">Посмотрите эти модели:</p>
        {handles.map(h => (
          <div key={h.id} className="mt-3 p-3" style={{ backgroundColor: 'var(--c-iron)', borderLeft: '3px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} className="font-medium" style={{ color: 'var(--c-gold)' }}>{h.title}</Link>
            <p className="mt-1 text-xs" style={{ color: 'var(--c-ash)' }}>
              {h.alloy} · {h.epoch} · {h.dimensions}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--c-ash)' }}>{h.description}</p>
          </div>
        ))}
        <p className="mt-3">Все изделия отливаются из латуни Л63 по ГОСТ 17711-93 и патинируются вручную по историческим рецептурам.</p>
        <p className="mt-2">Какой стиль вам ближе? Могу показать больше вариантов или рассказать подробнее о конкретной модели.</p>
      </>
    );
  }

  if (q.includes('петл')) {
    const hinges = products.filter(p => p.type === 'hinges');
    return (
      <>
        <p>Петли — это важный элемент, от которого зависит не только функциональность, но и историческая достоверность.</p>
        <p className="mt-2">Вот что у нас есть:</p>
        {hinges.map(h => (
          <div key={h.id} className="mt-3 p-3" style={{ backgroundColor: 'var(--c-iron)', borderLeft: '3px solid var(--c-gold)' }}>
            <Link to={`/product/${h.id}`} className="font-medium" style={{ color: 'var(--c-gold)' }}>{h.title}</Link>
            <p className="mt-1 text-xs" style={{ color: 'var(--c-ash)' }}>
              {h.alloy} · {h.epoch} · {h.dimensions}
            </p>
          </div>
        ))}
        <p className="mt-3">Все петли кованые из стали Ст3 с воронением в масле. Это исторически обоснованная технология.</p>
        <p className="mt-2">Для вашего объекта какие петли нужны — накладные, врезные, пяточные?</p>
      </>
    );
  }

  // Если клиент уже рассказал о проекте, переходим к конкретике
  if (context.objectType && !context.epoch && context.messageCount > 4) {
    context.epoch = input;
    return (
      <>
        <p>{acknowledgments[Math.floor(Math.random() * acknowledgments.length)]}</p>
        <p className="mt-2">{context.epoch} — это интересный период. У нас есть опыт работы с такими объектами.</p>
        <p className="mt-2">{transitions[Math.floor(Math.random() * transitions.length)]}</p>
        <p className="mt-2">Какой тип фурнитуры вам нужен? И примерное количество?</p>
      </>
    );
  }

  // Завершение сбора информации
  if (context.epoch && !context.quantity && context.messageCount > 6) {
    context.quantity = input;
    return (
      <>
        <p>Понял, {context.quantity} изделий. Это реалистичный объём.</p>
        <p className="mt-2">{transitions[Math.floor(Math.random() * transitions.length)]}</p>
        <p className="mt-2">Какой ориентировочный срок вам нужен? И есть ли какие-то особые требования по патинированию или покрытию?</p>
      </>
    );
  }

  // Финальная стадия — предложение связаться
  if (context.quantity && !context.contactInfo && context.messageCount > 8) {
    context.contactInfo = 'collected';
    return (
      <>
        <p>Отлично, я записал все детали вашего проекта.</p>
        <p className="mt-2">Чтобы я мог подготовить для вас точное коммерческое предложение с расчётом стоимости и сроков, давайте свяжемся более предметно.</p>
        <p className="mt-2">Оставьте, пожалуйста, ваш email или телефон — я передам информацию нашему менеджеру, и он свяжется с вами в течение рабочего дня.</p>
        <p className="mt-2">Или, если вам удобнее, можем продолжить обсуждение здесь. Как вам комфортнее?</p>
      </>
    );
  }

  // Дефолтные ответы для различных ситуаций
  if (q.includes('спасиб') || q.includes('благодар')) {
    return (
      <>
        <p>Всегда рад помочь!</p>
        <p className="mt-2">Если появятся ещё вопросы — обращайтесь. Мы всегда на связи.</p>
        <p className="mt-2">Успешной работы над вашим проектом!</p>
      </>
    );
  }

  if (q.includes('контакт') || q.includes('телефон') || q.includes('email') || q.includes('связ')) {
    return (
      <>
        <p>Конечно, вот наши контакты:</p>
        <ul className="mt-2 space-y-1 text-sm" style={{ paddingLeft: '20px' }}>
          <li>• Телефон: <a href="tel:+78121234567" style={{ color: 'var(--c-gold)' }}>+7 (812) 123-45-67</a></li>
          <li>• Email: <a href="mailto:info@tigeliGorn.ru" style={{ color: 'var(--c-gold)' }}>info@tigeliGorn.ru</a></li>
          <li>• Адрес: СПб, ул. Кузнечная, 12</li>
        </ul>
        <p className="mt-3">Режим работы: Пн–Пт, 09:00–18:00 MSK.</p>
        <p className="mt-2">Или можете оставить заявку через форму на сайте — <Link to="/order" style={{ color: 'var(--c-gold)' }}>рассчитать по проекту КГИОП</Link>.</p>
        <p className="mt-2">Чем ещё могу помочь?</p>
      </>
    );
  }

  // Универсальный ответ с переходом к сбору информации
  return (
    <>
      <p>{acknowledgments[Math.floor(Math.random() * acknowledgments.length)]}</p>
      <p className="mt-2">Расскажите подробнее о вашем проекте — это поможет мне дать более точные рекомендации.</p>
      <p className="mt-2">Какой объект вы реставрируете? И что именно нужно восстановить — ручки, петли, решётки?</p>
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
          <p>Здравствуйте! Меня зовут Алексей, я технолог мануфактуры «Тигель и Горн».</p>
          <p className="mt-2">Работаю с реставрационной фурнитурой уже 12 лет. Помогу подобрать изделия для вашего проекта, проконсультирую по нормативам КГИОП и отвечу на любые технические вопросы.</p>
          <p className="mt-2">Расскажите, пожалуйста, над каким проектом вы сейчас работаете?</p>
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
