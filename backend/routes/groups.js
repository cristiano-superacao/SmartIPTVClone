const express = require('express');
const { validate, groupsQuerySchema } = require('../middleware/validator');
const { asyncHandler, HttpError } = require('../middleware/errorHandler');
const channelService = require('../services/channelService');

const router = express.Router();

/**
 * GET /groups
 * Lista todos os grupos
 */
router.get(
  '/',
  validate(groupsQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const { activationCode } = req.query;

    // Verificar se código está ativo
    if (!channelService.isActivated(activationCode)) {
      throw new HttpError(404, 'Código de ativação não encontrado');
    }

    // Buscar grupos
    const groups = channelService.getGroups(activationCode);

    res.json({
      success: true,
      groups,
      total: groups.length,
    });
  })
);

module.exports = router;
