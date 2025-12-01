# 🧪 Teste Local - SmartIPTV Clone

## ✅ Status dos Testes

**Data:** 01/12/2025
**Hora:** $(Get-Date)

---

## 🖥️ Backend

### Instalação
```powershell
cd backend
npm install
```
**Status:** ✅ Concluído - 207 pacotes instalados

### Inicialização
```powershell
node index.js
```
**Status:** ✅ Rodando na porta 3000

### Endpoints Testados

#### 1. Health Check
- **URL:** http://localhost:3000/health
- **Método:** GET
- **Status:** ✅ Funcionando
- **Resposta Esperada:**
```json
{
  "success": true,
  "status": "online",
  "timestamp": "2025-12-01T..."
}
```

#### 2. Ativação (Teste Necessário)
- **URL:** http://localhost:3000/activate
- **Método:** POST
- **Body:**
```json
{
  "m3uUrl": "https://iptv-org.github.io/iptv/countries/br.m3u",
  "activationCode": "TEST123"
}
```

#### 3. Listar Canais (Após Ativação)
- **URL:** http://localhost:3000/channels?page=1&limit=20
- **Método:** GET

---

## 📱 Frontend

### Instalação
```powershell
npm install --legacy-peer-deps
```
**Status:** ✅ Concluído - 960 pacotes instalados

### Warnings Recebidos
- ⚠️ Pacotes deprecated (normais para React Native 0.72)
- ⚠️ Legacy peer deps usado para resolver conflitos

### Inicialização

#### Android
```powershell
npm run android
```
**Status:** ⏳ Aguardando teste

#### Web
```powershell
npm run web
```
**Status:** ⏳ Aguardando teste

---

## 🔧 Comandos para Testar Backend via PowerShell

### 1. Health Check
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
$response | ConvertTo-Json
```

### 2. Ativar Lista M3U
```powershell
$body = @{
    m3uUrl = "https://iptv-org.github.io/iptv/countries/br.m3u"
    activationCode = "TEST123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/activate" -Method POST -Body $body -ContentType "application/json"
$response | ConvertTo-Json
```

### 3. Listar Canais
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/channels?page=1&limit=10" -Method GET
$response | ConvertTo-Json
```

### 4. Listar Grupos
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/groups" -Method GET
$response | ConvertTo-Json
```

---

## 📊 Logs do Backend

O backend está gerando logs em:
- **Console:** Logs em tempo real
- **Arquivo:** `backend/logs/app.log`
- **Erros:** `backend/logs/error.log`

### Ver Logs em Tempo Real
```powershell
Get-Content backend\logs\app.log -Wait -Tail 20
```

---

## 🌐 Testar no Navegador

### Backend Endpoints
1. Health: http://localhost:3000/health
2. Status: http://localhost:3000/status
3. API Docs (se implementado): http://localhost:3000/api-docs

### Frontend Web (após npm run web)
- URL: http://localhost:19006

---

## 🐛 Troubleshooting

### Backend não inicia
```powershell
# Verificar se porta 3000 está em uso
netstat -ano | findstr :3000

# Matar processo na porta 3000
taskkill /PID <PID> /F
```

### Frontend - Conflitos de Dependências
```powershell
# Limpar cache
npm cache clean --force

# Remover node_modules
Remove-Item -Recurse -Force node_modules

# Reinstalar
npm install --legacy-peer-deps
```

### React Native não reconhecido
```powershell
# Instalar globalmente
npm install -g react-native-cli

# Ou usar npx
npx react-native start
```

---

## ✅ Checklist de Testes

### Backend
- [x] Instalação de dependências (207 pacotes)
- [x] Criação de arquivo .env
- [x] Inicialização do servidor (porta 3000)
- [x] Health check endpoint (funcionando)
- [x] Endpoint de ativação (205 canais carregados)
- [x] Endpoint de canais (paginação OK)
- [x] Endpoint de grupos (32 grupos listados)
- [x] Busca de canais (165 resultados com "TV")
- [x] Tratamento de erros (validação Joi ativa)
- [x] Rate limiting (configurado)
- [x] Logs estruturados (Winston funcionando)

### Frontend
- [x] Instalação de dependências
- [ ] Inicialização React Native
- [ ] Build para Android
- [ ] Build para Web
- [ ] Conexão com backend
- [ ] Ativação de lista M3U
- [ ] Listagem de canais
- [ ] Player de vídeo
- [ ] Sistema de favoritos

---

## 📝 Próximos Passos

1. **Testar API Completa:**
   - Ativar lista M3U real
   - Listar canais
   - Buscar canais
   - Filtrar por grupo

2. **Testar Frontend Web:**
   ```powershell
   npm run web
   ```

3. **Testar Frontend Android:**
   ```powershell
   npm run android
   ```

4. **Testar Integração:**
   - Frontend conectando no backend
   - Ativação funcionando
   - Player reproduzindo

5. **Testar Performance:**
   - Listas com 1000+ canais
   - Busca em tempo real
   - Scroll infinito

---

## 🎯 Resultado Esperado

### Backend ✅
- Servidor iniciado com sucesso
- Logs estruturados funcionando
- Endpoints respondendo
- Validação de dados ativa
- Rate limiting configurado

### Frontend ⏳
- App abrindo sem erros
- Tema escuro/claro funcionando
- Formulário de ativação responsivo
- Lista de canais carregando
- Player reproduzindo streams

---

**Status Geral:** 🟢 Backend 100% Funcional

- ✅ Backend: Rodando e testado
- ⏳ Frontend: Aguardando inicialização
- ⏳ Integração: Aguardando testes

---

## 🎉 Resultados dos Testes Backend

### ✅ Health Check
```json
{
  "success": true,
  "status": "online",
  "timestamp": "2025-12-01T23:15:56.699Z",
  "uptime": 28.6455574
}
```

### ✅ Ativação de Lista M3U
- **URL Testada:** https://iptv-org.github.io/iptv/countries/br.m3u
- **Código:** TEST123
- **Resultado:** 205 canais carregados em 32 grupos
- **Estatísticas:**
  - Total de canais: 205
  - Total de grupos: 32
  - Canais com logo: 205
  - Canais com tvgId: 205

### ✅ Listagem de Canais
- **Paginação:** Funcionando (5 canais por página)
- **Total de páginas:** 41 páginas
- **Canais de exemplo:** 1001 Noites, Adesso TV, AgroBrasil TV, Alpha Channel, Amazon Sat

### ✅ Grupos
- **Total:** 32 grupos
- **Categorias:** General (74), Entertainment (19), Religious (15), News (13), Education (9), etc.

### ✅ Busca
- **Termo:** "TV"
- **Resultados:** 165 canais encontrados
- **Paginação:** 17 páginas com 10 canais cada

---

**Status Geral:** 🟢 Backend 100% Funcional

- ✅ Backend: Rodando
- ⏳ Frontend: Aguardando inicialização
- ⏳ Integração: Aguardando testes
