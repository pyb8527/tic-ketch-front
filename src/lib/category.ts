export interface CategoryMeta { label: string; emoji: string; color: string; }

export function categoryMeta(category: string): CategoryMeta {
  switch (category) {
    case 'CONCERT':    return { label: '콘서트', emoji: '🎵', color: '#6c63ff' };
    case 'MUSICAL':    return { label: '뮤지컬', emoji: '🎭', color: '#ffd93d' };
    case 'SPORTS':     return { label: '스포츠', emoji: '⚽', color: '#00d4aa' };
    case 'EXHIBITION': return { label: '전시',   emoji: '🖼️', color: '#ff6b6b' };
    default:           return { label: '기타',   emoji: '🎫', color: '#94a3b8' };
  }
}

export function statusLabel(status: string): { label: string; color: string } {
  switch (status) {
    case 'ON_SALE':  return { label: '예매중',   color: '#00d4aa' };
    case 'UPCOMING': return { label: '오픈예정', color: '#6c63ff' };
    case 'SOLD_OUT': return { label: '매진',     color: '#94a3b8' };
    default:         return { label: '종료',     color: '#94a3b8' };
  }
}
