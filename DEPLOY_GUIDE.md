# 🎯 Deploy Completo Railway + Netlify

## ✅ Configurações Já Prontas

Seu projeto já está 100% configurado para deploy! Os arquivos criados:

- ✅ `backend/railway.json` - Configuração Railway
- ✅ `backend/RAILWAY.md` - Documentação Railway
- ✅ `netlify.toml` - Configuração Netlify
- ✅ `NETLIFY.md` - Documentação Netlify
- ✅ `src/utils/constants.js` - API_URL detecta ambiente automaticamente

---

## 🚀 PASSO 1: Deploy Backend no Railway

### 1.1 Criar Conta Railway

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Login com GitHub
4. Autorize Railway no GitHub

### 1.2 Deploy do Backend

1. **New Project** → **Deploy from GitHub repo**
2. Selecione: `CS_Criador` (ou seu nome de repositório)
3. Railway detectará automaticamente o Node.js
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install` (automático)
   - **Start Command:** `npm start` (automático)

### 1.3 Configurar Variáveis de Ambiente

No Railway Dashboard:

1. Clique no seu serviço
2. **Variables** → **New Variable**
3. Adicione:

```env
NODE_ENV=production
CORS_ORIGIN=https://smartiptv.netlify.app
LOG_LEVEL=info
```

⚠️ **Importante:** A variável `PORT` é automática no Railway!

### 1.4 Obter a URL do Backend

1. Clique em **Settings**
2. Em **Domains** → **Generate Domain**
3. Copie a URL gerada (exemplo):
   ```
   https://smartiptv-backend-production.up.railway.app
   ```

### 1.5 Testar Backend

```powershell
# Testar health check
curl https://sua-url.up.railway.app/health

# Deve retornar:
# {"success":true,"status":"online","timestamp":"..."}
```

✅ **Backend no Railway: COMPLETO!**

---

## 🌐 PASSO 2: Deploy Frontend no Netlify

### 2.1 Criar Conta Netlify

1. Acesse: https://www.netlify.com
2. **Sign up** com GitHub
3. Autorize Netlify

### 2.2 Preparar Build Local (Primeiro Deploy)

```powershell
# Atualizar URL da API (já está configurado automaticamente!)
# Verificar em src/utils/constants.js

# Instalar dependências
npm install

# Build para web
npm run build:web
```

### 2.3 Deploy no Netlify

**Opção A: Deploy Manual (Primeira Vez)**

1. No Netlify Dashboard: **Add new site** → **Deploy manually**
2. Arraste a pasta `web-build` para o Netlify
3. Aguarde o deploy (1-2 minutos)
4. Copie a URL gerada: `https://random-name.netlify.app`

**Opção B: Deploy Automático do GitHub (Recomendado)**

1. **Add new site** → **Import from Git**
2. Conectar GitHub
3. Selecione o repositório `CS_Criador`
4. Configure:
   - **Build command:** `npm run build:web`
   - **Publish directory:** `web-build`
   - **Base directory:** deixe vazio
5. **Deploy site**

### 2.4 Configurar Domínio Personalizado (Opcional)

1. **Domain settings** → **Add custom domain**
2. Digite: `smartiptv.netlify.app` (ou compre um domínio)
3. Netlify configura SSL automaticamente!

### 2.5 Testar Frontend

Acesse: `https://sua-url.netlify.app`

Deve abrir o app funcionando! 🎉

---

## 🔄 PASSO 3: Conectar Backend e Frontend

### 3.1 Atualizar CORS no Backend

No Railway, adicione a URL do Netlify:

```env
CORS_ORIGIN=https://sua-url.netlify.app
```

Se quiser múltiplas origens:

```env
CORS_ORIGIN=https://sua-url.netlify.app,https://outro-dominio.com
```

### 3.2 Verificar Conexão

1. Abra o frontend no Netlify
2. Abra DevTools (F12)
3. Aba **Network**
4. Tente ativar uma lista M3U
5. Deve fazer request para: `https://sua-url.up.railway.app/api/activate`

Se aparecer erro de CORS:
- Verifique a variável `CORS_ORIGIN` no Railway
- Redeploy do backend no Railway

---

## 📱 PASSO 4: Build APK Android (Opcional)

### 4.1 Preparar Keystore

```powershell
cd android/app

keytool -genkeypair -v -storetype PKCS12 -keystore smartiptv-release.keystore -alias smartiptv -keyalg RSA -keysize 2048 -validity 10000

# Preencha as informações solicitadas
# GUARDE A SENHA!
```

### 4.2 Configurar Gradle

Edite `android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=smartiptv-release.keystore
MYAPP_RELEASE_KEY_ALIAS=smartiptv
MYAPP_RELEASE_STORE_PASSWORD=SUA_SENHA_AQUI
MYAPP_RELEASE_KEY_PASSWORD=SUA_SENHA_AQUI
```

### 4.3 Build APK

```powershell
cd android
./gradlew assembleRelease
```

APK gerado em: `android/app/build/outputs/apk/release/app-release.apk`

### 4.4 Distribuir APK

**GitHub Releases:**

1. GitHub → Releases → Create new release
2. Tag: `v2.0.0`
3. Upload: `app-release.apk`
4. Publish release
5. Compartilhe o link!

---

## 🔧 PASSO 5: Configurações Finais

### 5.1 Variáveis de Ambiente no Netlify (se necessário)

Se quiser usar variáveis de ambiente no frontend:

1. Netlify → Site settings → Environment variables
2. Adicione:
   ```
   REACT_APP_API_URL=https://sua-url.up.railway.app/api
   ```

⚠️ Mas não é necessário, pois já detectamos automaticamente!

### 5.2 Preview de PRs (Netlify)

Netlify cria automaticamente previews de Pull Requests!

### 5.3 Logs e Monitoramento

**Railway:**
- Dashboard → Seu serviço → **Deployments** → Ver logs
- Logs em tempo real!

**Netlify:**
- Site → **Deploys** → Ver logs de build
- **Analytics** (grátis para 10k pageviews/mês)

---

## 📊 Resultado Final

✅ **Backend Railway:**
- URL: `https://smartiptv-backend-production.up.railway.app`
- Status: ✅ Online 24/7
- SSL: ✅ Automático
- Logs: ✅ Tempo real
- Custo: $5/mês

✅ **Frontend Netlify:**
- URL: `https://smartiptv.netlify.app`
- CDN: ✅ Global
- SSL: ✅ Automático
- Deploy: ✅ Automático (GitHub)
- Custo: R$ 0/mês

✅ **APK Android:**
- Distribuição: GitHub Releases
- Custo: R$ 0

---

## 🔄 Workflow de Desenvolvimento

### Desenvolvimento Local

```powershell
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm start

# Terminal 3: Android
npm run android
```

### Deploy Produção

1. **Commit e Push:**
   ```powershell
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin main
   ```

2. **Railway:** Deploy automático! ✅
3. **Netlify:** Deploy automático! ✅

**Não precisa fazer nada!** 🎉

---

## 🐛 Troubleshooting

### Backend não funciona no Railway

**Verificar:**
1. Logs no Railway Dashboard
2. Variável `PORT` não deve estar definida (é automática)
3. `package.json` tem `"start": "node index.js"`
4. Arquivo `index.js` existe em `backend/`

**Solução:**
```powershell
# Redeploy
# Railway → Deployments → Redeploy
```

### Frontend não conecta no backend

**Verificar:**
1. `CORS_ORIGIN` no Railway tem a URL do Netlify
2. `src/utils/constants.js` tem a URL correta
3. DevTools → Network → Ver erro

**Solução:**
```powershell
# Atualizar CORS no Railway
CORS_ORIGIN=https://sua-url.netlify.app

# Rebuild frontend
npm run build:web
netlify deploy --prod
```

### APK não conecta

**Solução:**
```javascript
// src/utils/constants.js
// Forçar produção
export const API_URL = 'https://sua-url.up.railway.app/api';
```

Rebuild APK.

---

## 💡 Dicas Pro

### Railway

1. **Adicionar PostgreSQL:** New → Database → PostgreSQL
2. **Ver métricas:** Dashboard → CPU/RAM usage
3. **Variáveis de ambiente:** Acessar entre serviços com `${{SERVICE_NAME.VAR}}`

### Netlify

1. **Forms:** Adicionar formulários sem backend
2. **Functions:** Criar serverless functions
3. **Split Testing:** A/B testing grátis
4. **Analytics:** Métricas de uso

### Custos

**Railway $5 inclui:**
- 500 horas de execução
- $5 de crédito
- Se passar, cobra $0.000463/min (~$20 adicional para uso pesado)

**Para economizar:**
- Use variável `RAILWAY_STATIC_URL` para servir assets
- Configure auto-sleep se tráfego baixo

---

## ✅ Checklist Final

- [ ] Backend deployado no Railway
- [ ] URL do backend copiada
- [ ] CORS configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Frontend buildado (`npm run build:web`)
- [ ] Frontend deployado no Netlify
- [ ] Testado no navegador
- [ ] APK Android buildado (opcional)
- [ ] APK distribuído no GitHub Releases (opcional)

---

## 🎯 Próximos Passos

1. **Domínio Personalizado:**
   - Comprar em Registro.br (~R$ 40/ano)
   - Configurar DNS no Netlify

2. **Monitoramento:**
   - Adicionar Google Analytics
   - Configurar Sentry (erros)
   - Uptime Robot (uptime)

3. **Melhorias:**
   - Adicionar MongoDB Atlas (grátis 512MB)
   - Configurar Redis no Railway
   - PWA para instalar no celular

---

**Seu app está PROFISSIONAL e RESPONSIVO com Railway + Netlify!** 🚀

Qualquer dúvida no deploy, é só perguntar! 😊
