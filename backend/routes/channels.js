const express = require('express');
const { validate, channelsQuerySchema, channelIdSchema } = require('../middleware/validator');
const { searchLimiter } = require('../middleware/rateLimiter');
const { asyncHandler, HttpError } = require('../middleware/errorHandler');
const channelService = require('../services/channelService');

const router = express.Router();

/**
 * GET /channels
 * Lista canais com filtros e paginação
 */
router.get(
  '/',
  searchLimiter,
  validate(channelsQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const { activationCode, page, limit, search, group } = req.query;

    // Verificar se código está ativo
    if (!channelService.isActivated(activationCode)) {
      throw new HttpError(404, 'Código de ativação não encontrado');
    }

    // Buscar canais
    const result = channelService.searchChannels({
      activationCode,
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      group,
    });

    res.json({
      success: true,
      ...result,
    });
  })
);

/**
 * GET /channels/:id
 * Retorna canal específico
 */
router.get(
  '/:id',
  validate(channelIdSchema, 'params'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { activationCode = 'DEFAULT' } = req.query;

    // Verificar se código está ativo
    if (!channelService.isActivated(activationCode)) {
      throw new HttpError(404, 'Código de ativação não encontrado');
    }

    // Buscar canal
    const channel = channelService.getChannelById(activationCode, id);
    if (!channel) {
      throw new HttpError(404, 'Canal não encontrado');
    }

    res.json({
      success: true,
      channel,
    });
  })
);

module.exports = router;
