const logger = require('../utils/logger');

/**
 * Serviço para gerenciar canais
 */
class ChannelService {
  constructor() {
    this.channels = new Map(); // activationCode -> array de canais
  }

  /**
   * Armazena canais para um código de ativação
   */
  setChannels(activationCode, channels) {
    this.channels.set(activationCode, channels);
    logger.info(`${channels.length} canais armazenados para código: ${activationCode}`);
  }

  /**
   * Retorna todos os canais de um código
   */
  getChannels(activationCode) {
    return this.channels.get(activationCode) || [];
  }

  /**
   * Busca canais com filtros e paginação
   */
  searchChannels({ activationCode, page = 1, limit = 50, search = '', group = '' }) {
    let channels = this.getChannels(activationCode);

    // Filtrar por grupo
    if (group) {
      channels = channels.filter(ch => 
        ch.group.toLowerCase() === group.toLowerCase()
      );
    }

    // Buscar por nome
    if (search) {
      const searchLower = search.toLowerCase();
      channels = channels.filter(ch =>
        ch.name.toLowerCase().includes(searchLower) ||
        (ch.tvgName && ch.tvgName.toLowerCase().includes(searchLower))
      );
    }

    // Paginação
    const total = channels.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedChannels = channels.slice(start, end);

    return {
      channels: paginatedChannels,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  }

  /**
   * Retorna grupos únicos
   */
  getGroups(activationCode) {
    const channels = this.getChannels(activationCode);
    const groups = [...new Set(channels.map(ch => ch.group))];
    
    return groups
      .filter(Boolean)
      .sort()
      .map(name => ({
        name,
        count: channels.filter(ch => ch.group === name).length,
      }));
  }

  /**
   * Busca canal por ID
   */
  getChannelById(activationCode, channelId) {
    const channels = this.getChannels(activationCode);
    return channels.find(ch => ch.id === channelId || ch.id == channelId);
  }

  /**
   * Verifica se código está ativo
   */
  isActivated(activationCode) {
    return this.channels.has(activationCode);
  }

  /**
   * Remove canais de um código
   */
  deactivate(activationCode) {
    const deleted = this.channels.delete(activationCode);
    if (deleted) {
      logger.info(`Código desativado: ${activationCode}`);
    }
    return deleted;
  }

  /**
   * Retorna estatísticas
   */
  getStats(activationCode) {
    const channels = this.getChannels(activationCode);
    const groups = this.getGroups(activationCode);

    return {
      totalChannels: channels.length,
      totalGroups: groups.length,
      channelsWithLogo: channels.filter(ch => ch.logo).length,
      channelsWithTvgId: channels.filter(ch => ch.tvgId).length,
    };
  }
}

module.exports = new ChannelService();
