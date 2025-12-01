import { Dimensions, Platform } from 'react-native';
import { BREAKPOINTS } from './constants';

/**
 * Detecta o tipo de dispositivo baseado na largura da tela
 */
export const getDeviceType = () => {
  const { width } = Dimensions.get('window');
  
  if (Platform.isTV) return 'tv';
  if (width >= BREAKPOINTS.tv) return 'tv';
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  return 'mobile';
};

/**
 * Verifica se é um dispositivo grande (tablet/desktop/tv)
 */
export const isLargeDevice = () => {
  const deviceType = getDeviceType();
  return ['tablet', 'desktop', 'tv'].includes(deviceType);
};

/**
 * Formata tempo em segundos para HH:MM:SS
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Valida URL
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Trunca texto com ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Gera cor aleatória para avatar
 */
export const getRandomColor = (seed) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E76F51', '#264653',
  ];
  
  if (!seed) return colors[Math.floor(Math.random() * colors.length)];
  
  // Hash simples da string para gerar índice consistente
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Formata número com separadores
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

/**
 * Calcula porcentagem
 */
export const calculatePercentage = (current, total) => {
  if (!total || total === 0) return 0;
  return Math.round((current / total) * 100);
};

/**
 * Remove acentos de string
 */
export const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Busca fuzzy (aproximada)
 */
export const fuzzySearch = (query, text) => {
  const normalizedQuery = removeAccents(query.toLowerCase());
  const normalizedText = removeAccents(text.toLowerCase());
  return normalizedText.includes(normalizedQuery);
};

/**
 * Agrupa array por propriedade
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Ordena array de objetos
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    }
    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
  });
};

/**
 * Remove duplicatas de array
 */
export const unique = (array, key) => {
  if (!key) return [...new Set(array)];
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};
