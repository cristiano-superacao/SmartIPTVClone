import axios from 'axios';
import { API_URL } from '../utils/constants';
import storageService from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Configuração do cliente HTTP
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de requisições
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Adicionar token de autenticação se existir
    const token = await storageService.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respostas
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, fazer logout
      await storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
    return Promise.reject(error);
  }
);

/**
 * Serviço de API
 */
class ApiService {
  /**
   * Ativa lista M3U
   */
  async activateList(m3uUrl, activationCode) {
    try {
      const response = await apiClient.post('/activate', {
        m3uUrl,
        activationCode,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao ativar lista',
      };
    }
  }

  /**
   * Busca canais com paginação
   */
  async fetchChannels({ page = 1, limit = 50, search = '', group = '', activationCode = 'DEFAULT' }) {
    try {
      const response = await apiClient.get('/channels', {
        params: { page, limit, search, group, activationCode },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar canais',
      };
    }
  }

  /**
   * Busca grupos/categorias
   */
  async fetchGroups(activationCode = 'DEFAULT') {
    try {
      const response = await apiClient.get('/groups', {
        params: { activationCode },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar grupos',
      };
    }
  }

  /**
   * Busca canal específico
   */
  async fetchChannel(channelId, activationCode = 'DEFAULT') {
    try {
      const response = await apiClient.get(`/channel/${channelId}`, {
        params: { activationCode },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar canal',
      };
    }
  }

  /**
   * Verifica código de ativação
   */
  async verifyCode(code) {
    try {
      const response = await apiClient.get(`/verify/${code}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Código inválido',
      };
    }
  }

  /**
   * Status do servidor
   */
  async getStatus() {
    try {
      const response = await apiClient.get('/status');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao verificar status do servidor',
      };
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Servidor offline' };
    }
  }
}

export default new ApiService();
