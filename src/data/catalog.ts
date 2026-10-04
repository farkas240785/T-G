export interface CatalogProduct {
  id: string;
  title: string;
  type: string;
  material: string;
  alloy: string;
  weight_g: number;
  dimensions: string;
  coating: string;
  mounting: string;
  status: 'approved' | 'prototype' | 'custom';
  has_prototype: boolean;
  epoch: string;
  source: string;
  gost: string;
  description: string;
  images: { main: string; macro: string; archive: string; object: string; };
  documents: Array<{ title: string; url: string; format: string }>;
  related: string[];
}

export interface Project {
  id: string;
  object: string;
  address: string;
  okn_status: string;
  year: number;
  task: string;
  images: { cover: string; before: string; process: string; after: string; };
  status: string;
  cgiop_letter: string;
}

export const catalogMeta = {
  types: { handles: "Ручки", espagnolettes: "Шпингалеты", architraves: "Наличники", grilles: "Решётки", hinges: "Петли", brackets: "Скобы", plates: "Накладки" },
  materials: { forging: "Ковка", casting: "Литьё латуни", combined: "Комбинированные" },
  statuses: { approved: "Согласовано КГИОП", prototype: "Есть архивный прототип", custom: "Требует согласования" }
};

export const products: CatalogProduct[] = [
  { id: "TG-A-014", title: "Ручка-скоба ампирная", type: "handles", material: "casting", alloy: "Л63", weight_g: 142, dimensions: "180×45×28 мм", coating: "Восковая патина", mounting: "Шпилька М6 + шайба", status: "approved", has_prototype: true, epoch: "Ампир, 1810–1820-е гг.", source: "РГИА, ф. 468, оп. 2, ед. хр. 1147", gost: "ГОСТ Р 55567-2013, п. 5.3", description: "Реплика дверной ручки-скобы в стиле ампир. Отлита из латуни Л63 по ГОСТ 17711-93, патинирована вручную.", images: { main: "https://image.qwenlm.ai/generated-images/fe2ad1d2-62b1-4d94-a9b8-ec881971d7a6/_result.png", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-A-015", "TG-K-008"] },
  { id: "TG-A-015", title: "Ручка-кноб барочная", type: "handles", material: "casting", alloy: "ЛС59-1", weight_g: 98, dimensions: "Ø52×68 мм", coating: "Натуральная латунь + воск", mounting: "Винт М5 через розетку", status: "approved", has_prototype: true, epoch: "Барокко, 1740–1760-е гг.", source: "ГАРФ, ф. 16, оп. 1, д. 412", gost: "ГОСТ Р 55567-2013, п. 5.3", description: "Кноб барочного типа из свинцовой латуни ЛС59-1.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-A-015", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-A-014", "TG-K-008"] },
  { id: "TG-K-008", title: "Петля карточная накладная", type: "hinges", material: "forging", alloy: "Ст3", weight_g: 340, dimensions: "220×80×6 мм", coating: "Воронение + воск", mounting: "Глухарь 8×80 (3 шт.)", status: "prototype", has_prototype: true, epoch: "Петровское барокко, 1710–1730-е гг.", source: "Эрмитаж, инв. № ЕР-48712", gost: "ГОСТ Р 55567-2013, п. 6.1", description: "Кованая накладная петля из стали Ст3. Воронение в масле.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-K-008", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-A-014", "TG-R-005"] },
  { id: "TG-S-003", title: "Шпингалет латунный с розеткой", type: "espagnolettes", material: "casting", alloy: "Л63", weight_g: 210, dimensions: "280×35×18 мм", coating: "Патинирование (тёмная бронза)", mounting: "Шурупы 4×25 (4 шт.)", status: "approved", has_prototype: false, epoch: "Классицизм, 1780–1800-е гг.", source: "Реставрационные обмеры 2022 г.", gost: "ГОСТ Р 55567-2013, п. 5.4", description: "Шпингалет оконный из латуни Л63 с декоративной розеткой.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-S-003", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-A-014", "TG-N-011"] },
  { id: "TG-N-011", title: "Наличник дверной наборный", type: "architraves", material: "casting", alloy: "Л63", weight_g: 1850, dimensions: "2100×120×25 мм", coating: "Полировка + лак", mounting: "Клей + шурупы скрытые", status: "custom", has_prototype: true, epoch: "Екатерининский классицизм, 1770–1790-е гг.", source: "Натурное обследование, 2023 г.", gost: "ГОСТ Р 55567-2013, п. 5.5", description: "Наборный дверной наличник из литой латуни.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-N-011", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Чертёж", url: "#", format: "DWG" }], related: ["TG-S-003", "TG-P-007"] },
  { id: "TG-R-005", title: "Решётка оконная кованая", type: "grilles", material: "forging", alloy: "Ст3", weight_g: 12400, dimensions: "1200×800×20 мм", coating: "Покраска (чёрный муар)", mounting: "Закладные в кладку", status: "approved", has_prototype: true, epoch: "Ампир, 1820–1830-е гг.", source: "РГИА, ф. 497, оп. 1, ед. хр. 234", gost: "ГОСТ Р 55567-2013, п. 6.2", description: "Кованая оконная решётка с растительным орнаментом.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-R-005", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Чертёж", url: "#", format: "DWG" }], related: ["TG-K-008", "TG-B-002"] },
  { id: "TG-P-007", title: "Накладка замочная прорезная", type: "plates", material: "casting", alloy: "Л63", weight_g: 68, dimensions: "130×45×4 мм", coating: "Патина (зелёная)", mounting: "Штифты 3×12 (2 шт.)", status: "approved", has_prototype: true, epoch: "Ампир, 1815–1825-е гг.", source: "РГИА, ф. 468, оп. 2, ед. хр. 1150", gost: "ГОСТ Р 55567-2013, п. 5.3", description: "Литая прорезная накладка на замочную скважину.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-P-007", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-A-014", "TG-N-011"] },
  { id: "TG-B-002", title: "Скоба дверная массивная", type: "brackets", material: "combined", alloy: "Л63 + Ст3", weight_g: 890, dimensions: "350×80×45 мм", coating: "Латунь полированная + сталь воронёная", mounting: "Шпилька М10 + втулка", status: "prototype", has_prototype: true, epoch: "Эклектика, 1860–1880-е гг.", source: "Натурные обмеры, особняк Половцева", gost: "ГОСТ Р 55567-2013, п. 5.3, 6.1", description: "Комбинированная дверная скоба: корпус — кованая сталь, рукоять — литая латунь.", images: { main: "https://placehold.co/600x750/1A1714/E8923A?text=TG-B-002", macro: "https://placehold.co/600x750/2A2520/A88968?text=Макро", archive: "https://placehold.co/600x750/3D3830/E8E0D4?text=Архив", object: "https://placehold.co/600x750/6B7F5E/E8E0D4?text=Объект" }, documents: [{ title: "Паспорт сплава", url: "#", format: "PDF" }], related: ["TG-R-005", "TG-K-008"] }
];

export const projects: Project[] = [
  { id: "PRJ-001", object: "Особняк Салтыковых", address: "СПб, наб. р. Мойки, 28", okn_status: "ОКН федерального значения", year: 2025, task: "Воссоздание 48 дверных ручек и 24 шпингалетов по архивным чертежам", images: { cover: "https://image.qwenlm.ai/generated-images/560ae809-1677-4d17-a4ab-9af26df28994/_result.png", before: "https://placehold.co/800x500/2A2520/E8E0D4?text=До", process: "https://placehold.co/800x500/3D3830/E8E0D4?text=Процесс", after: "https://placehold.co/800x500/6B7F5E/E8E0D4?text=После" }, status: "approved", cgiop_letter: "№ 03-28/1147 от 14.03.2025" },
  { id: "PRJ-002", object: "Дворец Разумовского", address: "СПб, Адмиралтейский пр., 6", okn_status: "ОКН федерального значения", year: 2024, task: "Изготовление 12 кованых решёток и 36 петель", images: { cover: "https://image.qwenlm.ai/generated-images/f22e4dfe-1d63-42e6-be55-7427cf496965/_result.png", before: "https://placehold.co/800x500/2A2520/E8E0D4?text=До", process: "https://placehold.co/800x500/3D3830/E8E0D4?text=Процесс", after: "https://placehold.co/800x500/6B7F5E/E8E0D4?text=После" }, status: "approved", cgiop_letter: "№ 03-14/0892 от 22.07.2024" },
  { id: "PRJ-003", object: "Усадьба Богословка", address: "Ленинградская обл., Всеволожский р-н", okn_status: "ОКН регионального значения", year: 2024, task: "Комплексное оснащение церкви: 64 изделия", images: { cover: "https://placehold.co/800x500/1A1714/E8923A?text=Усадьба+Богословка", before: "https://placehold.co/800x500/2A2520/E8E0D4?text=До", process: "https://placehold.co/800x500/3D3830/E8E0D4?text=Процесс", after: "https://placehold.co/800x500/6B7F5E/E8E0D4?text=После" }, status: "approved", cgiop_letter: "№ 02-41/0567 от 10.11.2024" },
  { id: "PRJ-004", object: "Аничков дворец", address: "СПб, Невский пр., 39", okn_status: "ОКН федерального значения", year: 2023, task: "Реставрация каминных решёток и 16 дверных скоб", images: { cover: "https://placehold.co/800x500/1A1714/E8923A?text=Аничков+дворец", before: "https://placehold.co/800x500/2A2520/E8E0D4?text=До", process: "https://placehold.co/800x500/3D3830/E8E0D4?text=Процесс", after: "https://placehold.co/800x500/6B7F5E/E8E0D4?text=После" }, status: "approved", cgiop_letter: "№ 03-07/0234 от 05.04.2023" }
];

export function getProduct(id: string): CatalogProduct | undefined { return products.find(p => p.id === id); }
export function getRelatedProducts(related: string[]): CatalogProduct[] { return products.filter(p => related.includes(p.id)); }
export function filterProducts(filters: { type?: string; material?: string; status?: string; search?: string; }): CatalogProduct[] {
  return products.filter(p => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.material && p.material !== filters.material) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search && !p.id.toLowerCase().includes(filters.search.toLowerCase()) && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}
