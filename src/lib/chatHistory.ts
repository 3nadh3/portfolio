export type ChatTurn = { role: 'user' | 'assistant'; content: string };
export const CHAT_STORAGE_KEY = 'trinadh-chat-v1';
export function limitHistory(messages: ChatTurn[]): ChatTurn[] {
  let history = messages.slice(-24);
  let size = history.reduce((sum, message) => sum + message.content.length, 0);
  while (size > 24000 && history.length) {
    size -= history[0].content.length + history[1].content.length;
    history = history.slice(2);
  }
  return history;
}
export function loadHistory(): ChatTurn[] {
  try {
    const data: unknown = JSON.parse(sessionStorage.getItem(CHAT_STORAGE_KEY) || '[]');
    if (!Array.isArray(data) || data.length > 24 || data.length % 2 !== 0) return [];
    if (!data.every((m, i) => m && m.role === (i % 2 ? 'assistant' : 'user') && typeof m.content === 'string' && m.content.trim() && m.content.length <= 12000)) return [];
    return limitHistory(data);
  } catch { return []; }
}
export function saveHistory(history: ChatTurn[]) {
  try { sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history)); } catch { /* Chat still works when storage is unavailable. */ }
}
