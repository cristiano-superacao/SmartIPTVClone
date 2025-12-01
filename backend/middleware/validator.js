const Joi = require('joi');

// Schema para ativação
const activationSchema = Joi.object({
  m3uUrl: Joi.string()
    .uri()
    .required()
    .messages({
      'string.uri': 'URL da lista M3U inválida',
      'any.required': 'URL da lista M3U é obrigatória',
    }),
  activationCode: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional()
    .default('DEFAULT')
    .messages({
      'string.alphanum': 'Código deve conter apenas letras e números',
      'string.min': 'Código deve ter no mínimo 3 caracteres',
      'string.max': 'Código deve ter no máximo 30 caracteres',
    }),
});

// Schema para busca de canais
const channelsQuerySchema = Joi.object({
  activationCode: Joi.string().alphanum().optional().default('DEFAULT'),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(50),
  search: Joi.string().max(100).optional().default(''),
  group: Joi.string().max(100).optional().default(''),
});

// Schema para grupos
const groupsQuerySchema = Joi.object({
  activationCode: Joi.string().alphanum().optional().default('DEFAULT'),
});

// Schema para canal específico
const channelIdSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .required()
    .messages({
      'any.required': 'ID do canal é obrigatório',
    }),
});

// Middleware de validação
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors,
      });
    }

    // Substituir req[property] pelos valores validados
    req[property] = value;
    next();
  };
};

module.exports = {
  activationSchema,
  channelsQuerySchema,
  groupsQuerySchema,
  channelIdSchema,
  validate,
};
