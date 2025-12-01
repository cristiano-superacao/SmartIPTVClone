const axios = require('axios');
const logger = require('../utils/logger');
const m3uParser = require('./m3uParser');
const channelService = require('./channelService');

/**
 * Serviço para gerenciar playlists
 */
class PlaylistService {
  constructor() {
    this.playlists = new Map(); // id -> playlist
    this.playlistCounter = 1;
  }

  /**
   * Gera URL da playlist baseado no tipo de servidor
   */
  generatePlaylistUrl(playlist) {
    const { serverType, serverUrl, username, password, outputFormat } = playlist;

    switch (serverType) {
      case 'xtream':
        // Formato Xtream Codes: http://server:port/get.php?username=xxx&password=xxx&type=m3u_plus&output=ts
        const params = new URLSearchParams({
          username,
          password,
          type: outputFormat || 'm3u_plus',
          output: 'ts',
        });
        return `${serverUrl}/get.php?${params.toString()}`;

      case 'stalker':
        // Formato Stalker Portal
        return `${serverUrl}/portal.php?type=itv&action=get_ordered_list&genre=*&force_ch_link_check=&fav=0&sortby=number&hd=0&JsHttpRequest=1-xml`;

      case 'm3u_url':
      default:
        // URL direta do M3U
        return serverUrl;
    }
  }

  /**
   * Cria nova playlist
   */
  async createPlaylist(data) {
    const id = `playlist_${Date.now()}_${this.playlistCounter++}`;
    
    const playlist = {
      id,
      name: data.name,
      description: data.description || '',
      serverType: data.serverType,
      serverUrl: data.serverUrl,
      username: data.username || '',
      password: data.password || '',
      outputFormat: data.outputFormat || 'm3u_plus',
      logo: data.logo || '',
      color: data.color || '#007AFF',
      enabled: true,
      channelCount: 0,
      lastUpdate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Gerar URL completa
    playlist.fullUrl = this.generatePlaylistUrl(playlist);

    this.playlists.set(id, playlist);
    logger.info(`Playlist criada: ${id} - ${playlist.name}`);

    return playlist;
  }

  /**
   * Lista todas as playlists
   */
  async getAllPlaylists() {
    return Array.from(this.playlists.values()).map(playlist => ({
      ...playlist,
      // Ocultar senha na listagem
      password: playlist.password ? '********' : '',
    }));
  }

  /**
   * Busca playlist por ID
   */
  async getPlaylistById(id) {
    const playlist = this.playlists.get(id);
    if (!playlist) return null;

    return {
      ...playlist,
      password: playlist.password ? '********' : '',
    };
  }

  /**
   * Atualiza playlist
   */
  async updatePlaylist(id, updates) {
    const playlist = this.playlists.get(id);
    if (!playlist) return null;

    // Atualizar campos permitidos
    const allowedFields = ['name', 'description', 'logo', 'color', 'enabled'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        playlist[field] = updates[field];
      }
    });

    playlist.updatedAt = new Date().toISOString();

    this.playlists.set(id, playlist);
    logger.info(`Playlist atualizada: ${id}`);

    return {
      ...playlist,
      password: playlist.password ? '********' : '',
    };
  }

  /**
   * Remove playlist
   */
  async deletePlaylist(id) {
    const playlist = this.playlists.get(id);
    if (!playlist) return false;

    // Desativar canais associados
    channelService.deactivate(id);

    this.playlists.delete(id);
    logger.info(`Playlist removida: ${id}`);

    return true;
  }

  /**
   * Ativa playlist e carrega canais
   */
  async activatePlaylist(id) {
    const playlist = this.playlists.get(id);
    if (!playlist) {
      throw new Error('Playlist não encontrada');
    }

    logger.info(`Ativando playlist: ${id} - ${playlist.name}`);

    try {
      // Baixar M3U
      const m3uUrl = this.generatePlaylistUrl(playlist);
      const response = await axios.get(m3uUrl, {
        timeout: 30000,
        maxContentLength: 100 * 1024 * 1024, // 100MB
        headers: {
          'User-Agent': 'SmartIPTV/2.0',
        },
      });

      const m3uContent = response.data;

      // Validar e parsear
      const validation = m3uParser.validate(m3uContent);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Armazenar canais usando o ID da playlist como código
      channelService.setChannels(id, validation.channels);

      // Atualizar playlist
      playlist.channelCount = validation.channels.length;
      playlist.lastUpdate = new Date().toISOString();
      playlist.enabled = true;
      this.playlists.set(id, playlist);

      const stats = channelService.getStats(id);

      logger.info(`Playlist ativada: ${id} - ${stats.totalChannels} canais`);

      return {
        playlist: {
          ...playlist,
          password: playlist.password ? '********' : '',
        },
        stats,
      };
    } catch (error) {
      logger.error(`Erro ao ativar playlist ${id}: ${error.message}`);
      throw new Error(`Erro ao carregar playlist: ${error.message}`);
    }
  }

  /**
   * Atualiza canais da playlist
   */
  async refreshPlaylist(id) {
    return this.activatePlaylist(id);
  }

  /**
   * Retorna estatísticas da playlist
   */
  async getPlaylistStats(id) {
    const playlist = this.playlists.get(id);
    if (!playlist) return null;

    const stats = channelService.getStats(id);

    return {
      ...stats,
      playlist: {
        id: playlist.id,
        name: playlist.name,
        enabled: playlist.enabled,
        lastUpdate: playlist.lastUpdate,
      },
    };
  }

  /**
   * Testa conexão com servidor
   */
  async testConnection(serverData) {
    try {
      const testPlaylist = {
        serverType: serverData.serverType,
        serverUrl: serverData.serverUrl,
        username: serverData.username || '',
        password: serverData.password || '',
        outputFormat: serverData.outputFormat || 'm3u_plus',
      };

      const url = this.generatePlaylistUrl(testPlaylist);
      
      const response = await axios.head(url, {
        timeout: 10000,
      });

      return {
        success: true,
        status: response.status,
        message: 'Conexão estabelecida com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

module.exports = new PlaylistService();
