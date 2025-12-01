import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'react-native-localize';

// Traduções
const resources = {
  'pt-BR': {
    translation: {
      // Comum
      search: 'Buscar',
      cancel: 'Cancelar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      back: 'Voltar',
      next: 'Próximo',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      
      // Ativação
      activate: 'Ativar',
      activationCode: 'Código de Ativação',
      m3uUrl: 'URL da Lista M3U',
      activateList: 'Ativar Lista',
      activationSuccess: 'Lista ativada com sucesso!',
      activationError: 'Erro ao ativar lista',
      
      // Canais
      channels: 'Canais',
      allChannels: 'Todos os Canais',
      favorites: 'Favoritos',
      recent: 'Recentes',
      noChannels: 'Nenhum canal encontrado',
      channelCount: '{{count}} canais',
      
      // Grupos
      groups: 'Grupos',
      allGroups: 'Todos os Grupos',
      selectGroup: 'Selecionar Grupo',
      
      // Player
      play: 'Reproduzir',
      pause: 'Pausar',
      stop: 'Parar',
      volume: 'Volume',
      mute: 'Mudo',
      unmute: 'Ativar Som',
      fullscreen: 'Tela Cheia',
      exitFullscreen: 'Sair da Tela Cheia',
      
      // Configurações
      settings: 'Configurações',
      language: 'Idioma',
      theme: 'Tema',
      darkMode: 'Modo Escuro',
      lightMode: 'Modo Claro',
      autoTheme: 'Automático',
      
      // Rede
      offline: 'Sem conexão com a internet',
      online: 'Conectado',
      reconnecting: 'Reconectando...',
      
      // Erros
      networkError: 'Erro de conexão',
      serverError: 'Erro no servidor',
      notFound: 'Não encontrado',
      unauthorized: 'Não autorizado',
      tryAgain: 'Tentar novamente',
    },
  },
  'en-US': {
    translation: {
      // Common
      search: 'Search',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Activation
      activate: 'Activate',
      activationCode: 'Activation Code',
      m3uUrl: 'M3U Playlist URL',
      activateList: 'Activate List',
      activationSuccess: 'List activated successfully!',
      activationError: 'Error activating list',
      
      // Channels
      channels: 'Channels',
      allChannels: 'All Channels',
      favorites: 'Favorites',
      recent: 'Recent',
      noChannels: 'No channels found',
      channelCount: '{{count}} channels',
      
      // Groups
      groups: 'Groups',
      allGroups: 'All Groups',
      selectGroup: 'Select Group',
      
      // Player
      play: 'Play',
      pause: 'Pause',
      stop: 'Stop',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      
      // Settings
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      autoTheme: 'Auto',
      
      // Network
      offline: 'No internet connection',
      online: 'Connected',
      reconnecting: 'Reconnecting...',
      
      // Errors
      networkError: 'Network error',
      serverError: 'Server error',
      notFound: 'Not found',
      unauthorized: 'Unauthorized',
      tryAgain: 'Try again',
    },
  },
  'es-ES': {
    translation: {
      // Común
      search: 'Buscar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      back: 'Volver',
      next: 'Siguiente',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      
      // Activación
      activate: 'Activar',
      activationCode: 'Código de Activación',
      m3uUrl: 'URL de Lista M3U',
      activateList: 'Activar Lista',
      activationSuccess: '¡Lista activada con éxito!',
      activationError: 'Error al activar lista',
      
      // Canales
      channels: 'Canales',
      allChannels: 'Todos los Canales',
      favorites: 'Favoritos',
      recent: 'Recientes',
      noChannels: 'No se encontraron canales',
      channelCount: '{{count}} canales',
      
      // Grupos
      groups: 'Grupos',
      allGroups: 'Todos los Grupos',
      selectGroup: 'Seleccionar Grupo',
      
      // Reproductor
      play: 'Reproducir',
      pause: 'Pausar',
      stop: 'Detener',
      volume: 'Volumen',
      mute: 'Silenciar',
      unmute: 'Activar Sonido',
      fullscreen: 'Pantalla Completa',
      exitFullscreen: 'Salir de Pantalla Completa',
      
      // Configuración
      settings: 'Configuración',
      language: 'Idioma',
      theme: 'Tema',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      autoTheme: 'Automático',
      
      // Red
      offline: 'Sin conexión a internet',
      online: 'Conectado',
      reconnecting: 'Reconectando...',
      
      // Errores
      networkError: 'Error de conexión',
      serverError: 'Error del servidor',
      notFound: 'No encontrado',
      unauthorized: 'No autorizado',
      tryAgain: 'Intentar de nuevo',
    },
  },
};

// Detectar idioma do sistema
const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    const locale = locales[0].languageTag;
    // Mapear para nossos idiomas suportados
    if (locale.startsWith('pt')) return 'pt-BR';
    if (locale.startsWith('es')) return 'es-ES';
    return 'en-US';
  }
  return 'pt-BR';
};

// Inicializar i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Carregar idioma salvo
AsyncStorage.getItem('user_language').then(savedLanguage => {
  if (savedLanguage && resources[savedLanguage]) {
    i18n.changeLanguage(savedLanguage);
  }
});

export default i18n;
