// ═══════════════════════════════════════════════════════════════
// ДАННЫЕ ЛИЧНОГО КАБИНЕТА
// ═══════════════════════════════════════════════════════════════

export type UserRole = 'customer' | 'architect' | 'technologist' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  company: string;
  email: string;
  phone: string;
}

export interface OrderStage {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  completedAt?: string;
  reportUrl?: string;
  reportType?: 'photo' | 'video' | 'document';
  blocked?: boolean;
  blockedReason?: string;
}

export interface Order {
  id: string;
  number: string;
  title: string;
  objectName: string;
  objectAddress: string;
  oknStatus: boolean;
  customer: string;
  createdAt: string;
  deadline: string;
  totalAmount: number;
  paidAmount: number;
  stages: OrderStage[];
  items: OrderItem[];
  documents: OrderDocument[];
  chatMessages: ChatMessage[];
  status: 'draft' | 'in_progress' | 'completed' | 'shipped';
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  alloy: string;
  dimensions: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDocument {
  id: string;
  type: 'passport' | 'certificate' | 'drawing' | 'act' | 'invoice' | 'upd';
  title: string;
  url: string;
  uploadedAt: string;
  required: boolean;
}

export interface ChatMessage {
  id: string;
  author: string;
  authorRole: UserRole;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface AlloyOption {
  id: string;
  name: string;
  gost: string;
  allowedForOKN: boolean;
  description: string;
}

export interface PatinaOption {
  id: string;
  name: string;
  type: 'hot' | 'chemical' | 'imitation';
  allowedForOKN: boolean;
  color: string;
}

// ═══════════════════════════════════════════════════════════════
// MOCK-ДАННЫЕ
// ═══════════════════════════════════════════════════════════════

export const currentUser: User = {
  id: 'user-001',
  name: 'Иванов Сергей Петрович',
  role: 'architect',
  company: 'ООО "Реставрация-СПб"',
  email: 'ivanov@restoration-spb.ru',
  phone: '+7 (812) 555-12-34',
};

export const alloys: AlloyOption[] = [
  { id: 'l63', name: 'Латунь Л63', gost: 'ГОСТ 17711-93', allowedForOKN: true, description: 'Основной сплав для литья. Историческая преемственность.' },
  { id: 'ls59', name: 'Латунь ЛС59-1', gost: 'ГОСТ 17711-93', allowedForOKN: true, description: 'Свинцовая латунь для сложных форм.' },
  { id: 'st3', name: 'Сталь Ст3', gost: 'ГОСТ 380-2005', allowedForOKN: true, description: 'Для кованых элементов.' },
  { id: 'chn', name: 'Чугун ЧХН', gost: 'ГОСТ 3443-2015', allowedForOKN: true, description: 'Для чугунного литья.' },
  { id: 'cam', name: 'ЦАМ (цинковый сплав)', gost: '-', allowedForOKN: false, description: 'ЗАПРЕЩЁН для ОКН. Не имеет исторической преемственности.' },
];

export const patinas: PatinaOption[] = [
  { id: 'hot-green', name: 'Горячая зелёная патина', type: 'hot', allowedForOKN: true, color: '#5A7A5E' },
  { id: 'hot-brown', name: 'Горячая коричневая патина', type: 'hot', allowedForOKN: true, color: '#6B5A3E' },
  { id: 'hot-black', name: 'Горячая чёрная патина', type: 'hot', allowedForOKN: true, color: '#2A2520' },
  { id: 'chem-blue', name: 'Химическая синяя', type: 'chemical', allowedForOKN: true, color: '#2E5C8A' },
  { id: 'imit-gold', name: 'Имитация золота (краска)', type: 'imitation', allowedForOKN: false, color: '#D4A017' },
  { id: 'imit-bronze', name: 'Имитация бронзы (аэрозоль)', type: 'imitation', allowedForOKN: false, color: '#8B6914' },
];

export const mockOrders: Order[] = [
  {
    id: 'order-001',
    number: 'ТГ-2026-0147',
    title: 'Ручки дверные для особняка Салтыковых',
    objectName: 'Особняк Салтыковых',
    objectAddress: 'СПб, наб. р. Мойки, 28',
    oknStatus: true,
    customer: 'ООО "Реставрация-СПб"',
    createdAt: '2026-01-15',
    deadline: '2026-04-30',
    totalAmount: 1250000,
    paidAmount: 375000,
    status: 'in_progress',
    stages: [
      { id: 1, title: 'Согласование ТЗ', description: 'Утверждение исторических аналогов и технической документации', status: 'completed', completedAt: '2026-01-20', reportUrl: '#', reportType: 'document' },
      { id: 2, title: 'Модельный участок', description: 'Изготовление восковых моделей и пресс-форм', status: 'completed', completedAt: '2026-02-05', reportUrl: '#', reportType: 'photo' },
      { id: 3, title: 'Металлургия', description: 'Плавка, литьё по выплавляемым моделям', status: 'in_progress', reportUrl: '#', reportType: 'video' },
      { id: 4, title: 'Механическая обработка', description: 'Зачистка, сверление, нарезка резьбы', status: 'pending' },
      { id: 5, title: 'Патинирование', description: 'Горячая патина по исторической рецептуре', status: 'pending' },
      { id: 6, title: 'ОТК и отгрузка', description: 'Контроль качества, упаковка, отправка', status: 'pending', blocked: true, blockedReason: 'Не загружен паспорт сплава' },
    ],
    items: [
      { id: 'item-1', productId: 'TG-A-014', title: 'Ручка-скоба ампирная', alloy: 'Л63', dimensions: '180×45×28 мм', quantity: 24, unitPrice: 12500, totalPrice: 300000 },
      { id: 'item-2', productId: 'TG-S-003', title: 'Шпингалет латунный', alloy: 'Л63', dimensions: '280×35×18 мм', quantity: 24, unitPrice: 8500, totalPrice: 204000 },
    ],
    documents: [
      { id: 'doc-1', type: 'passport', title: 'Паспорт сплава Л63 (плавка №2026-014)', url: '#', uploadedAt: '2026-02-10', required: true },
      { id: 'doc-2', type: 'certificate', title: 'Сертификат соответствия ГОСТ', url: '#', uploadedAt: '2026-01-25', required: true },
      { id: 'doc-3', type: 'drawing', title: 'Чертёж TG-A-014 (рев. 3)', url: '#', uploadedAt: '2026-01-18', required: true },
      { id: 'doc-4', type: 'act', title: 'Акт скрытых работ (шаблон)', url: '#', uploadedAt: '2026-01-15', required: false },
    ],
    chatMessages: [
      { id: 'msg-1', author: 'Петров А.В.', authorRole: 'technologist', content: 'Загрузил фотоотчёт по этапу "Модельный участок". Восковые модели готовы, отправляем на плавку.', timestamp: '2026-02-05T14:30:00' },
      { id: 'msg-2', author: 'Иванов С.П.', authorRole: 'architect', content: 'Принято. Когда ожидать паспорт сплава?', timestamp: '2026-02-05T15:45:00' },
      { id: 'msg-3', author: 'Петров А.В.', authorRole: 'technologist', content: 'Паспорт будет готов после плавки, ориентировочно 10 февраля. Загружу в папку объекта.', timestamp: '2026-02-05T16:00:00' },
    ],
  },
  {
    id: 'order-002',
    number: 'ТГ-2026-0148',
    title: 'Кованые решётки для Дворца Разумовского',
    objectName: 'Дворец Разумовского',
    objectAddress: 'СПб, Адмиралтейский пр., 6',
    oknStatus: true,
    customer: 'Музей "Дворец Разумовского"',
    createdAt: '2026-02-01',
    deadline: '2026-06-15',
    totalAmount: 2800000,
    paidAmount: 840000,
    status: 'in_progress',
    stages: [
      { id: 1, title: 'Согласование ТЗ', description: 'Утверждение исторических аналогов', status: 'completed', completedAt: '2026-02-10', reportUrl: '#', reportType: 'document' },
      { id: 2, title: 'Модельный участок', description: 'Изготовление макетов', status: 'in_progress', reportUrl: '#', reportType: 'photo' },
      { id: 3, title: 'Металлургия', description: 'Ковка элементов', status: 'pending' },
      { id: 4, title: 'Механическая обработка', description: 'Сборка конструкций', status: 'pending' },
      { id: 5, title: 'Патинирование', description: 'Воронение + воск', status: 'pending' },
      { id: 6, title: 'ОТК и отгрузка', description: 'Контроль и отправка', status: 'pending' },
    ],
    items: [
      { id: 'item-3', productId: 'TG-R-005', title: 'Решётка оконная кованая', alloy: 'Ст3', dimensions: '1200×800×20 мм', quantity: 12, unitPrice: 85000, totalPrice: 1020000 },
    ],
    documents: [
      { id: 'doc-5', type: 'passport', title: 'Паспорт сплава Ст3', url: '#', uploadedAt: '2026-02-12', required: true },
      { id: 'doc-6', type: 'drawing', title: 'Чертёж решётки (рев. 2)', url: '#', uploadedAt: '2026-02-05', required: true },
    ],
    chatMessages: [
      { id: 'msg-4', author: 'Сидоров В.И.', authorRole: 'manager', content: 'Макеты готовы, отправляю на согласование.', timestamp: '2026-02-15T10:00:00' },
    ],
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
};
