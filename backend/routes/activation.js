const express = require('express');
const axios = require('axios');
const { validate, activationSchema } = require('../middleware/validator');
const { activationLimiter } = require('../middleware/rateLimiter');
const { asyncHandler, HttpError } = require('../middleware/errorHandler');
const m3uParser = require('../services/m3uParser');
const channelService = require('../services/channelService');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * POST /activate
 * Ativa lista M3U
 */
router.post(
  '/',
  activationLimiter,
  validate(activationSchema),
  asyncHandler(async (req, res) => {
    const { m3uUrl, activationCode } = req.body;

    logger.info(`Ativação iniciada - Código: ${activationCode}, URL: ${m3uUrl}`);

    // Baixar arquivo M3U
    let m3uContent;
    try {
      const response = await axios.get(m3uUrl, {
        timeout: 30000,
        maxContentLength: 50 * 1024 * 1024, // 50MB
      });
      m3uContent = response.data;
    } catch (error) {
      logger.error(`Erro ao baixar M3U: ${error.message}`);
      throw new HttpError(400, 'Não foi possível baixar a lista M3U. Verifique a URL.');
    }

    // Validar e parsear M3U
    const validation = m3uParser.validate(m3uContent);
    if (!validation.valid) {
      throw new HttpError(400, validation.error);
    }

    // Armazenar canais
    channelService.setChannels(activationCode, validation.channels);

    // Estatísticas
    const stats = channelService.getStats(activationCode);

    logger.info(`Ativação concluída - ${stats.totalChannels} canais, ${stats.totalGroups} grupos`);

    res.json({
      success: true,
      message: 'Lista ativada com sucesso',
      activationCode,
      stats,
    });
  })
);

/**
 * GET /verify/:code
 * Verifica se código está ativo
 */
router.get(
  '/verify/:code',
  asyncHandler(async (req, res) => {
    const { code } = req.params;
    const isActive = channelService.isActivated(code);

    res.json({
      success: true,
      active: isActive,
      ...(isActive && { stats: channelService.getStats(code) }),
    });
  })
);

/**
 * DELETE /deactivate/:code
 * Desativa código
 */
router.delete(
  '/deactivate/:code',
  asyncHandler(async (req, res) => {
    const { code } = req.params;
    const deleted = channelService.deactivate(code);

    if (!deleted) {
      throw new HttpError(404, 'Código não encontrado');
    }

    res.json({
      success: true,
      message: 'Código desativado com sucesso',
    });
  })
);

module.exports = router;
