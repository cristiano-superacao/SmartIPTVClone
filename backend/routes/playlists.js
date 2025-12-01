const express = require('express');
const { validate } = require('../middleware/validator');
const { apiLimiter } = require('../middleware/rateLimiter');
const { asyncHandler, HttpError } = require('../middleware/errorHandler');
const playlistService = require('../services/playlistService');
const logger = require('../utils/logger');
const Joi = require('joi');

const router = express.Router();

// Schemas de validação
const createPlaylistSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().allow('').max(500),
  serverType: Joi.string().valid('m3u_url', 'xtream', 'stalker').required(),
  serverUrl: Joi.string().uri().required(),
  username: Joi.string().when('serverType', {
    is: Joi.valid('xtream', 'stalker'),
    then: Joi.required(),
    otherwise: Joi.optional().allow(''),
  }),
  password: Joi.string().when('serverType', {
    is: Joi.valid('xtream', 'stalker'),
    then: Joi.required(),
    otherwise: Joi.optional().allow(''),
  }),
  outputFormat: Joi.string().valid('m3u', 'm3u_plus', 'm3u8', 'ts').default('m3u_plus'),
  logo: Joi.string().uri().allow('').optional(),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#007AFF'),
});

const updatePlaylistSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().allow('').max(500),
  logo: Joi.string().uri().allow(''),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/),
  enabled: Joi.boolean(),
}).min(1);

/**
 * POST /playlists
 * Cria nova playlist
 */
router.post(
  '/',
  apiLimiter,
  validate(createPlaylistSchema),
  asyncHandler(async (req, res) => {
    const playlistData = req.body;
    
    logger.info(`Criando playlist: ${playlistData.name}`);

    // Criar playlist
    const playlist = await playlistService.createPlaylist(playlistData);

    res.status(201).json({
      success: true,
      message: 'Playlist criada com sucesso',
      playlist,
    });
  })
);

/**
 * GET /playlists
 * Lista todas as playlists
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const playlists = await playlistService.getAllPlaylists();

    res.json({
      success: true,
      playlists,
      total: playlists.length,
    });
  })
);

/**
 * GET /playlists/:id
 * Retorna playlist específica
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const playlist = await playlistService.getPlaylistById(id);

    if (!playlist) {
      throw new HttpError(404, 'Playlist não encontrada');
    }

    res.json({
      success: true,
      playlist,
    });
  })
);

/**
 * PUT /playlists/:id
 * Atualiza playlist
 */
router.put(
  '/:id',
  validate(updatePlaylistSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    logger.info(`Atualizando playlist: ${id}`);

    const playlist = await playlistService.updatePlaylist(id, updates);

    if (!playlist) {
      throw new HttpError(404, 'Playlist não encontrada');
    }

    res.json({
      success: true,
      message: 'Playlist atualizada com sucesso',
      playlist,
    });
  })
);

/**
 * DELETE /playlists/:id
 * Remove playlist
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    logger.info(`Removendo playlist: ${id}`);

    const deleted = await playlistService.deletePlaylist(id);

    if (!deleted) {
      throw new HttpError(404, 'Playlist não encontrada');
    }

    res.json({
      success: true,
      message: 'Playlist removida com sucesso',
    });
  })
);

/**
 * POST /playlists/:id/activate
 * Ativa playlist e carrega canais
 */
router.post(
  '/:id/activate',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    logger.info(`Ativando playlist: ${id}`);

    const result = await playlistService.activatePlaylist(id);

    res.json({
      success: true,
      message: 'Playlist ativada com sucesso',
      ...result,
    });
  })
);

/**
 * POST /playlists/:id/refresh
 * Atualiza canais da playlist
 */
router.post(
  '/:id/refresh',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    logger.info(`Atualizando canais da playlist: ${id}`);

    const result = await playlistService.refreshPlaylist(id);

    res.json({
      success: true,
      message: 'Playlist atualizada com sucesso',
      ...result,
    });
  })
);

/**
 * GET /playlists/:id/stats
 * Retorna estatísticas da playlist
 */
router.get(
  '/:id/stats',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const stats = await playlistService.getPlaylistStats(id);

    if (!stats) {
      throw new HttpError(404, 'Playlist não encontrada');
    }

    res.json({
      success: true,
      stats,
    });
  })
);

module.exports = router;
