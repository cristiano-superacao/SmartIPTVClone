# Netlify Deploy - SmartIPTV Frontend

Este frontend está otimizado para deploy no Netlify.

## 🚀 Build Settings

**Build command:**
```bash
npm run build:web
```

**Publish directory:**
```
web-build
```

**Node version:**
```
18
```

## 📋 Variáveis de Ambiente

Configure no Netlify Dashboard:

```env
REACT_APP_API_URL=https://smartiptv-backend-production.up.railway.app/api
NODE_ENV=production
```

## 🔧 Configuração Automática

O arquivo `netlify.toml` já está configurado com:
- Redirects para SPA
- Headers de segurança
- Cache otimizado
- Compressão automática

## 🔗 URL de Produção

Após o deploy:
`https://smartiptv.netlify.app`

Você pode configurar domínio personalizado gratuitamente!
