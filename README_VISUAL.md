# 📺 SmartIPTV Clone v2.0

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![Status](https://img.shields.io/badge/status-production_ready-success.svg)

**Plataforma profissional de streaming IPTV multiplataforma com arquitetura moderna e escalável**

[🚀 Demo](https://smartiptv.netlify.app) • [📖 Documentação](docs/index.html) • [🐛 Issues](https://github.com/cristiano-superacao/SmartIPTVClone/issues) • [💬 Discussões](https://github.com/cristiano-superacao/SmartIPTVClone/discussions)

</div>

---

## 📋 Índice

- [Sobre](#-sobre)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Arquitetura](#️-arquitetura)
- [Deploy](#-deploy)
- [API](#-api)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre

Clone profissional do SmartIPTV desenvolvido com React Native e Node.js, oferecendo uma experiência completa de streaming IPTV em múltiplas plataformas.

### ✨ Destaques

- 📱 **Multiplataforma**: Android, iOS, Web, Android TV, Samsung Tizen, LG webOS
- 🎨 **Design Moderno**: Interface responsiva estilo TV com tema escuro/claro
- ⚡ **Alta Performance**: Virtualização, memoização, lazy loading
- 🔒 **Seguro**: Validação Joi, rate limiting, Helmet, CORS
- 🌍 **Internacional**: PT-BR, EN-US, ES-ES
- 📊 **Logs Estruturados**: Winston logging com rotação automática

---

## 🚀 Features

<table>
<tr>
<td width="50%">

### 🎨 Interface & UX
- ✅ Design responsivo profissional
- ✅ Tema escuro/claro automático
- ✅ Animações fluidas
- ✅ Layout adaptativo
- ✅ Controles intuitivos

</td>
<td width="50%">

### ⚙️ Funcionalidades
- ✅ Listas M3U (local/remota)
- ✅ Player completo
- ✅ Busca em tempo real
- ✅ Sistema de favoritos
- ✅ Histórico de reprodução

</td>
</tr>
<tr>
<td width="50%">

### 🚀 Performance
- ✅ Virtualização de listas
- ✅ Memoização React.memo
- ✅ Custom hooks
- ✅ Context API
- ✅ Compressão gzip

</td>
<td width="50%">

### 🔒 Segurança
- ✅ Validação de dados (Joi)
- ✅ Rate limiting
- ✅ Headers de segurança
- ✅ CORS configurável
- ✅ Logs estruturados

</td>
</tr>
</table>

---

## 📸 Screenshots

<div align="center">

### Mobile
<img src="https://via.placeholder.com/300x600/007AFF/FFFFFF?text=Home+Screen" alt="Home" width="200"/>
<img src="https://via.placeholder.com/300x600/5856D6/FFFFFF?text=Player" alt="Player" width="200"/>
<img src="https://via.placeholder.com/300x600/34C759/FFFFFF?text=Favorites" alt="Favorites" width="200"/>

### Web/TV
<img src="https://via.placeholder.com/800x450/007AFF/FFFFFF?text=Web+Interface" alt="Web" width="100%"/>

</div>

---

## 🛠️ Tecnologias

<div align="center">

### Frontend
![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![i18next](https://img.shields.io/badge/i18next-23.7-26A69A?style=for-the-badge)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express)
![Joi](https://img.shields.io/badge/Joi-Validation-blue?style=for-the-badge)

### DevOps
![Railway](https://img.shields.io/badge/Railway-Deploy-0B0D0E?style=for-the-badge&logo=railway)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?style=for-the-badge&logo=netlify)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions)

</div>

---

## 📦 Instalação

### Pré-requisitos

```bash
node --version  # v18 ou superior
npm --version   # v9 ou superior
```

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/cristiano-superacao/SmartIPTVClone.git
cd SmartIPTVClone
```

### 2️⃣ Instale o Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

✅ Backend rodando em `http://localhost:3000`

### 3️⃣ Instale o Frontend

```bash
cd ..
npm install

# Android
npm run android

# iOS (macOS)
npm run ios

# Web
npm run web
```

---

## 🎮 Uso

### Ativação de Lista M3U

1. Abra o aplicativo
2. Insira a URL da lista M3U
3. (Opcional) Insira código de ativação
4. Clique em **Ativar**

### Exemplo de Lista M3U

```bash
http://exemplo.com/lista.m3u
```

### Controles do Player

- **Play/Pause**: Clique no player
- **Busca**: Campo de busca no topo
- **Favoritos**: Ícone de estrela
- **Grupos**: Filtro por categoria

---

## 🏗️ Arquitetura

```
SmartIPTV Clone
├── 📱 Frontend (React Native)
│   ├── Components (reutilizáveis)
│   ├── Screens (telas)
│   ├── Context (estado global)
│   ├── Hooks (lógica customizada)
│   └── Services (API/Storage)
│
├── 🖥️ Backend (Node.js/Express)
│   ├── Routes (endpoints)
│   ├── Services (lógica de negócio)
│   ├── Middleware (validação/segurança)
│   └── Utils (helpers)
│
└── 📚 Documentação
    ├── README.md (este arquivo)
    ├── DEPLOY_GUIDE.md (deploy)
    ├── HOSTING.md (hospedagem)
    └── docs/index.html (site)
```

### Padrões Arquiteturais

- **Component-Based**: Componentização total
- **Context API**: Estado global sem Redux
- **Custom Hooks**: Lógica reutilizável
- **Service Layer**: Camada de serviços
- **RESTful API**: Backend REST

---

## ☁️ Deploy

### Railway + Netlify (Recomendado)

**Custo**: ~R$ 25/mês

```bash
# Backend no Railway
railway login
railway init
railway up

# Frontend no Netlify
netlify login
netlify init
netlify deploy --prod
```

📖 **Guia Completo**: [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)

### Alternativas

| Plataforma | Custo | Ideal Para |
|------------|-------|------------|
| Railway + Netlify | ~R$ 25/mês | Produção |
| Render + Vercel | Grátis | Projetos pessoais |
| DigitalOcean | ~R$ 24/mês | Controle total |
| AWS | ~R$ 50+/mês | Escala empresarial |

---

## 🔌 API

### Base URL

```
Desenvolvimento: http://localhost:3000
Produção: https://smartiptv-backend.up.railway.app
```

### Endpoints

#### POST /activate
Ativa lista M3U

**Request:**
```json
{
  "m3uUrl": "http://exemplo.com/lista.m3u",
  "activationCode": "CODIGO123"
}
```

**Response:**
```json
{
  "success": true,
  "channelCount": 150,
  "activationCode": "CODIGO123"
}
```

#### GET /channels
Lista canais (paginado)

```
GET /channels?page=1&limit=50&search=ESPN
```

#### Outros Endpoints

- `GET /channel/:id` - Busca canal
- `GET /groups` - Lista grupos
- `GET /status` - Status do servidor
- `GET /verify/:code` - Verifica código

📖 **Documentação Completa**: [backend/README.md](backend/README.md)

---

## 📊 Status do Projeto

<div align="center">

| Componente | Status | Descrição |
|-----------|--------|-----------|
| Frontend | ✅ | Completo e funcional |
| Backend | ✅ | API RESTful operacional |
| Documentação | ✅ | Completa e atualizada |
| Deploy | ✅ | Railway + Netlify |
| Segurança | ✅ | Validação + Rate Limit |
| Performance | ✅ | Otimizado |

</div>

### Roadmap

- [ ] Persistência MongoDB
- [ ] Autenticação de usuários
- [ ] EPG (guia de programação)
- [ ] Gravação de programas
- [ ] VOD (vídeo sob demanda)
- [ ] Controle parental
- [ ] Sincronização entre dispositivos

---

## 👥 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

## ⚠️ Aviso Legal

Este software é apenas para fins educacionais. O uso de conteúdo IPTV deve estar em conformidade com as leis locais e direitos autorais. Os desenvolvedores não se responsabilizam pelo uso indevido.

---

## 🙏 Agradecimentos

- React Native Community
- Node.js Foundation
- Railway & Netlify
- Todos os contribuidores

---

## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/cristiano-superacao/SmartIPTVClone/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/cristiano-superacao/SmartIPTVClone/discussions)
- 📧 **Email**: contato@exemplo.com
- 📖 **Docs**: [Documentação Completa](docs/index.html)

---

<div align="center">

**Desenvolvido com ❤️ usando React Native e Node.js**

⭐ Se este projeto foi útil, considere dar uma estrela!

[⬆ Voltar ao topo](#-smartiptv-clone-v20)

</div>
