# 🌐 Guia Completo de Hospedagem - SmartIPTV Clone

## 📋 Opções de Hospedagem

### 🖥️ Backend (Node.js/Express)

---

## 1️⃣ **Heroku** (Recomendado para Iniciantes)

**Prós:**
- ✅ Deploy muito fácil
- ✅ Free tier disponível
- ✅ SSL grátis
- ✅ Add-ons fáceis (MongoDB, Redis)

**Contras:**
- ❌ Free tier dorme após 30min
- ❌ Pode ser caro em escala

**Como fazer:**

```powershell
# 1. Instalar Heroku CLI
# Download: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Criar app
cd backend
heroku create smartiptv-api

# 4. Criar Procfile
echo "web: node index.js" > Procfile

# 5. Configurar variáveis de ambiente
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
heroku config:set CORS_ORIGIN=https://seu-app.com

# 6. Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# 7. Ver logs
heroku logs --tail
```

**URL do Backend:** `https://smartiptv-api.herokuapp.com`

---

## 2️⃣ **Render** (Recomendado - Melhor Free Tier)

**Prós:**
- ✅ Free tier generoso (não dorme tanto)
- ✅ Deploy automático do GitHub
- ✅ SSL grátis
- ✅ Muito fácil de usar

**Contras:**
- ❌ Free tier tem limitações de CPU

**Como fazer:**

1. Acesse [render.com](https://render.com)
2. Conecte seu GitHub
3. **New → Web Service**
4. Selecione o repositório
5. Configure:
   - **Name:** smartiptv-backend
   - **Root Directory:** backend
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Adicione variáveis de ambiente
7. Deploy!

**URL do Backend:** `https://smartiptv-backend.onrender.com`

---

## 3️⃣ **Railway** (Moderno e Simples)

**Prós:**
- ✅ Interface moderna
- ✅ $5 grátis/mês
- ✅ Deploy automático
- ✅ Suporte a PostgreSQL, MongoDB, Redis

**Contras:**
- ❌ Requer cartão de crédito

**Como fazer:**

1. Acesse [railway.app](https://railway.app)
2. **New Project → Deploy from GitHub**
3. Selecione o repositório
4. Configure variáveis de ambiente
5. Deploy automático!

**URL do Backend:** `https://smartiptv-production.up.railway.app`

---

## 4️⃣ **DigitalOcean App Platform**

**Prós:**
- ✅ Infraestrutura confiável
- ✅ Fácil escalar
- ✅ $200 crédito grátis (novos usuários)

**Contras:**
- ❌ Não tem free tier permanente
- ❌ ~$5/mês

**Como fazer:**

1. Acesse [digitalocean.com](https://www.digitalocean.com/products/app-platform)
2. Create App → GitHub
3. Selecione repositório
4. Configure build settings
5. Deploy

---

## 5️⃣ **VPS Manual** (Avançado)

**Opções:**
- **DigitalOcean Droplet** - $4/mês
- **Linode** - $5/mês
- **Vultr** - $3.50/mês
- **AWS EC2** - Free tier 12 meses
- **Google Cloud** - $300 crédito grátis

**Setup no Ubuntu:**

```bash
# 1. Conectar via SSH
ssh root@seu-ip

# 2. Atualizar sistema
apt update && apt upgrade -y

# 3. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 4. Instalar PM2
npm install -g pm2

# 5. Clonar repositório
git clone https://github.com/seu-usuario/smartiptv-clone.git
cd smartiptv-clone/backend

# 6. Instalar dependências
npm install --production

# 7. Configurar .env
nano .env
# Cole suas variáveis

# 8. Iniciar com PM2
pm2 start index.js --name smartiptv-backend
pm2 save
pm2 startup

# 9. Instalar Nginx (proxy reverso)
apt install -y nginx

# 10. Configurar Nginx
nano /etc/nginx/sites-available/smartiptv

# Cole:
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 11. Ativar site
ln -s /etc/nginx/sites-available/smartiptv /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 12. SSL grátis com Let's Encrypt
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com
```

---

### 📱 Frontend (React Native)

---

## 1️⃣ **Android (APK)**

**Google Play Store:**

```powershell
# 1. Gerar keystore
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore smartiptv-release.keystore -alias smartiptv -keyalg RSA -keysize 2048 -validity 10000

# 2. Configurar gradle
# android/gradle.properties
MYAPP_RELEASE_STORE_FILE=smartiptv-release.keystore
MYAPP_RELEASE_KEY_ALIAS=smartiptv
MYAPP_RELEASE_STORE_PASSWORD=sua-senha
MYAPP_RELEASE_KEY_PASSWORD=sua-senha

# 3. Build AAB para Play Store
cd android
./gradlew bundleRelease

# 4. AAB gerado em:
# android/app/build/outputs/bundle/release/app-release.aab

# 5. Upload no Google Play Console
# https://play.google.com/console
```

**Distribuição Direta (APK):**

```powershell
# Build APK
cd android
./gradlew assembleRelease

# APK em:
# android/app/build/outputs/apk/release/app-release.apk

# Hospedar APK em:
# - Firebase App Distribution
# - GitHub Releases
# - Seu próprio site
```

---

## 2️⃣ **iOS (App Store)**

**Requisitos:**
- Mac com Xcode
- Apple Developer Account ($99/ano)

```bash
# 1. Abrir no Xcode
cd ios
open SmartIPTV.xcworkspace

# 2. Configurar certificados
# Xcode → Signing & Capabilities

# 3. Archive
# Product → Archive

# 4. Upload
# Window → Organizer → Upload to App Store

# 5. App Store Connect
# https://appstoreconnect.apple.com
```

---

## 3️⃣ **Web (React Native Web)**

### **Vercel** (Recomendado)

**Prós:**
- ✅ Totalmente grátis
- ✅ Deploy automático
- ✅ SSL grátis
- ✅ CDN global

```powershell
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Build
npm run build:web

# 4. Deploy
cd web-build
vercel --prod
```

**URL:** `https://smartiptv.vercel.app`

---

### **Netlify**

```powershell
# 1. Instalar CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Build
npm run build:web

# 4. Deploy
cd web-build
netlify deploy --prod
```

**URL:** `https://smartiptv.netlify.app`

---

### **GitHub Pages** (Grátis)

```powershell
# 1. Instalar gh-pages
npm install --save-dev gh-pages

# 2. Adicionar no package.json
"homepage": "https://seu-usuario.github.io/smartiptv-clone",
"scripts": {
  "predeploy": "npm run build:web",
  "deploy": "gh-pages -d web-build"
}

# 3. Deploy
npm run deploy
```

---

### **Firebase Hosting**

```powershell
# 1. Instalar CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicializar
firebase init hosting

# 4. Build
npm run build:web

# 5. Deploy
firebase deploy --only hosting
```

---

## 📺 TV Apps (Tizen/webOS)

### **Samsung Tizen**

1. **Tizen Studio**: Download em [developer.samsung.com](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk.html)
2. Build web app
3. Empacotar com Tizen Studio
4. Submit no Samsung Seller Office

### **LG webOS**

1. **webOS TV SDK**: Download em [webostv.developer.lge.com](http://webostv.developer.lge.com/)
2. Build web app
3. Empacotar com SDK
4. Submit no LG Content Store

---

## 💰 Custos Estimados

### **Opção Gratuita (Recomendada para Começar)**

| Serviço | Custo | Limites |
|---------|-------|---------|
| Render (Backend) | **Grátis** | 750h/mês, dorme após inatividade |
| Vercel (Web) | **Grátis** | 100GB bandwidth |
| GitHub (Código) | **Grátis** | Ilimitado (público) |
| **TOTAL** | **R$ 0/mês** | Bom para testes |

---

### **Opção Intermediária (Produção Pequena)**

| Serviço | Custo | Benefícios |
|---------|-------|-----------|
| Railway (Backend) | **$5/mês** | Sem sleep, 512MB RAM |
| Vercel Pro (Web) | **$20/mês** | Analytics, mais bandwidth |
| MongoDB Atlas | **Grátis** | 512MB storage |
| **TOTAL** | **~R$ 125/mês** | Produção leve |

---

### **Opção Profissional (Produção Média)**

| Serviço | Custo | Benefícios |
|---------|-------|-----------|
| DigitalOcean Droplet | **$12/mês** | 2GB RAM, 50GB SSD |
| Cloudflare | **Grátis** | CDN + SSL |
| MongoDB Atlas | **$9/mês** | 2GB storage |
| **TOTAL** | **~R$ 105/mês** | Alta disponibilidade |

---

### **Opção Enterprise (Grande Escala)**

| Serviço | Custo | Benefícios |
|---------|-------|-----------|
| AWS/GCP | **$50-200/mês** | Auto-scaling, Load balancer |
| MongoDB Atlas | **$57/mês** | 10GB, backup automático |
| CloudFlare Pro | **$20/mês** | WAF, DDoS protection |
| **TOTAL** | **~R$ 635-1270/mês** | Enterprise grade |

---

## 🚀 Recomendação por Caso de Uso

### **Teste/Desenvolvimento**
```
Backend: Render (Free)
Web: Vercel (Free)
CUSTO: R$ 0/mês
```

### **Projeto Pessoal/Portfólio**
```
Backend: Railway ($5)
Web: Vercel (Free)
CUSTO: R$ 25/mês
```

### **Produto com Usuários Reais**
```
Backend: DigitalOcean Droplet ($12)
Web: Vercel Pro ($20)
Database: MongoDB Atlas ($9)
CUSTO: R$ 205/mês
```

### **Startup/Comercial**
```
Backend: AWS/GCP ($100+)
Web: Vercel Pro + CDN
Database: MongoDB Atlas ($57+)
Monitoring: DataDog/NewRelic
CUSTO: R$ 800+/mês
```

---

## 🔧 Configuração Pós-Deploy

### **Atualizar URL da API no Frontend**

```javascript
// src/utils/constants.js
export const API_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://smartiptv-backend.onrender.com/api'  // Produção
    : 'http://localhost:3000/api';                   // Desenvolvimento
```

### **Variáveis de Ambiente (Backend)**

```env
# .env produção
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://smartiptv.vercel.app,https://smartiptv.netlify.app
LOG_LEVEL=info
```

---

## 📊 Monitoramento

### **Grátis:**
- **Uptime Robot**: Monitora se o site está online
- **Google Analytics**: Métricas de uso
- **Sentry** (Free tier): Rastreamento de erros

### **Pago:**
- **DataDog**: Monitoring completo
- **New Relic**: APM
- **LogRocket**: Session replay

---

## 🎯 Passo a Passo Recomendado (Iniciante)

### **Fase 1: Deploy Gratuito**

1. **Backend em Render.com**
   - Cadastrar → Conectar GitHub → Deploy
   - Copiar URL: `https://seu-app.onrender.com`

2. **Atualizar constants.js** com a URL

3. **Web em Vercel**
   - `npm run build:web`
   - `vercel --prod`

4. **Testar tudo funcionando**

### **Fase 2: APK Android**

1. Gerar keystore
2. Build APK release
3. Hospedar em GitHub Releases
4. Compartilhar link

### **Fase 3: Domínio Próprio** (Opcional)

1. Comprar domínio (~R$ 40/ano)
   - **Registro.br** (BR)
   - **Namecheap** (internacional)
   
2. Configurar DNS:
   - `api.seudominio.com` → Backend
   - `app.seudominio.com` → Frontend

---

## 📞 Próximos Passos

1. ✅ Escolher plataforma de hospedagem
2. ✅ Deploy do backend
3. ✅ Atualizar URL no frontend
4. ✅ Build e deploy do frontend
5. ✅ Testar em produção
6. ✅ Configurar monitoramento
7. ✅ (Opcional) Domínio próprio

---

**Recomendação Final:**
- **Começar com Render (backend) + Vercel (web) = 100% GRÁTIS**
- **Depois migrar para Railway/DigitalOcean se precisar**

---

Precisa de ajuda com alguma plataforma específica? Posso detalhar o processo! 🚀
