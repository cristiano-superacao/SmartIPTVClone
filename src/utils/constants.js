// Configurações da aplicação
// Detecta ambiente automaticamente
const getApiUrl = () => {
  // Web em produção (Netlify)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://smartiptv-backend-production.up.railway.app/api';
  }
  
  // Mobile em produção (APK/IPA)
  if (!__DEV__) {
    return 'https://smartiptv-backend-production.up.railway.app/api';
  }
  
  // Desenvolvimento local
  return 'http://localhost:3000/api';
};

export const API_URL = getApiUrl();

// Cores do tema
export const COLORS = {
  dark: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#000000',
    surface: '#1a1a1a',
    card: '#2a2a2a',
    border: '#333333',
    text: '#FFFFFF',
    textSecondary: '#888888',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  light: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    card: '#FFFFFF',
    border: '#C6C6C8',
    text: '#000000',
    textSecondary: '#666666',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
};

// Breakpoints responsivos
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  tv: 1920,
};

// Configurações do player
export const PLAYER_CONFIG = {
  controlTimeout: 5000,
  seekInterval: 10,
  bufferConfig: {
    minBufferMs: 15000,
    maxBufferMs: 50000,
    bufferForPlaybackMs: 2500,
    bufferForPlaybackAfterRebufferMs: 5000,
  },
};

// Configurações de paginação
export const PAGINATION = {
  channelsPerPage: 50,
  initialLoad: 20,
};

// Teclas do controle remoto
export const REMOTE_KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  BACK: 27,
  PLAY_PAUSE: 179,
  CHANNEL_UP: 33,
  CHANNEL_DOWN: 34,
};

// Storage keys
export const STORAGE_KEYS = {
  FAVORITES: '@smartiptv:favorites',
  HISTORY: '@smartiptv:history',
  SETTINGS: '@smartiptv:settings',
  THEME: '@smartiptv:theme',
  ACTIVATION_CODE: '@smartiptv:activation_code',
  LAST_CHANNEL: '@smartiptv:last_channel',
};

// Idiomas disponíveis
export const LANGUAGES = {
  'pt-BR': { name: 'Português', flag: '🇧🇷' },
  'en-US': { name: 'English', flag: '🇺🇸' },
  'es-ES': { name: 'Español', flag: '🇪🇸' },
};

// Categorias padrão
export const DEFAULT_CATEGORIES = [
  'Todos',
  'Esportes',
  'Filmes',
  'Séries',
  'Notícias',
  'Infantil',
  'Documentários',
  'Música',
  'Entretenimento',
];
