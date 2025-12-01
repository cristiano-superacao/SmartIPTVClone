# Railway Deploy - SmartIPTV Backend

Este backend está configurado para deploy no Railway.

## 🚀 Deploy Automático

O Railway detecta automaticamente:
- Node.js (via package.json)
- Porta configurada via variável PORT
- Start command: `npm start`

## 📋 Variáveis de Ambiente Necessárias

Configure no Railway Dashboard:

```env
NODE_ENV=production
PORT=${{PORT}}
CORS_ORIGIN=https://smartiptv.netlify.app
LOG_LEVEL=info
```

## 🔗 URL de Produção

Após o deploy, a URL será:
`https://smartiptv-backend-production.up.railway.app`

Use esta URL no frontend em `src/utils/constants.js`
