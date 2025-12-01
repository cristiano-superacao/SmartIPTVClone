# SmartIPTV Clone - Backend API

API REST para gerenciamento de listas IPTV M3U com validação, segurança e rate limiting.

## 🚀 Funcionalidades

- ✅ Parser M3U robusto
- ✅ Validação de dados com Joi
- ✅ Rate limiting por endpoint
- ✅ Logging estruturado com Winston
- ✅ Segurança com Helmet
- ✅ Compressão de respostas
- ✅ Tratamento de erros centralizado
- ✅ Paginação e busca
- ✅ Filtros por grupo

## 📋 Requisitos

- Node.js 14+
- npm ou yarn

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

## 🏃 Execução

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📡 Endpoints

### Ativação

**POST** `/api/activate`
```json
{
  "m3uUrl": "https://example.com/playlist.m3u",
  "activationCode": "MYCODE" // opcional, padrão: DEFAULT
}
```

**GET** `/api/activate/verify/:code`

**DELETE** `/api/activate/deactivate/:code`

### Canais

**GET** `/api/channels?activationCode=CODE&page=1&limit=50&search=termo&group=Filmes`

**GET** `/api/channels/:id?activationCode=CODE`

### Grupos

**GET** `/api/groups?activationCode=CODE`

### Status

**GET** `/health` - Health check

**GET** `/api/status` - Informações do servidor

## 🔒 Rate Limiting

- API geral: 100 requisições / 15 minutos
- Ativação: 10 requisições / 1 hora
- Busca: 30 requisições / 1 minuto

## 📝 Logs

Os logs são salvos em:
- `logs/combined.log` - Todos os logs
- `logs/error.log` - Apenas erros
- `logs/access.log` - HTTP requests (produção)

## 🏗️ Estrutura

```
backend/
├── middleware/
│   ├── errorHandler.js   # Tratamento de erros
│   ├── rateLimiter.js    # Rate limiting
│   └── validator.js      # Validação Joi
├── routes/
│   ├── activation.js     # Rotas de ativação
│   ├── channels.js       # Rotas de canais
│   └── groups.js         # Rotas de grupos
├── services/
│   ├── m3uParser.js      # Parser M3U
│   └── channelService.js # Lógica de negócio
├── utils/
│   └── logger.js         # Winston logger
├── logs/                 # Logs do sistema
├── index.js              # Servidor Express
└── package.json
```

## 🛡️ Segurança

- Helmet configurado
- Rate limiting por IP
- Validação de entrada com Joi
- CORS configurável
- Logs de auditoria

## 📦 Dependências Principais

- express
- joi (validação)
- helmet (segurança)
- winston (logging)
- axios (HTTP client)
- compression (gzip)
- express-rate-limit

## 🔜 Próximas Melhorias

- [ ] Integração com MongoDB
- [ ] Cache com Redis
- [ ] Autenticação JWT
- [ ] WebSocket para atualizações em tempo real
- [ ] Suporte a EPG
- [ ] Testes automatizados
