# SmartIPTV Clone — Projeto Completo

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)

## 📋 Sobre o Projeto

Clone profissional e completo do SmartIPTV com arquitetura moderna, suporte multiplataforma para streaming de canais IPTV, validação de dados, segurança, e performance otimizada.

### ✨ Características Principais

**Interface & UX**
- ✅ Design responsivo e profissional estilo TV
- ✅ Tema escuro/claro com detecção automática
- ✅ Internacionalização (PT-BR, EN-US, ES-ES)
- ✅ Layout adaptativo (mobile, tablet, TV, web)
- ✅ Animações fluidas e transições suaves

**Funcionalidades**
- ✅ Suporte para listas M3U remotas e locais
- ✅ Player de vídeo com controles completos
- ✅ Busca em tempo real com debounce
- ✅ Filtragem por grupos/categorias
- ✅ Sistema de favoritos persistente
- ✅ Histórico de reprodução
- ✅ Paginação infinita otimizada
- ✅ Detecção de status de rede
- ✅ Cache de imagens com FastImage

**Performance & Otimização**
- ✅ Virtualização de listas (FlatList otimizado)
- ✅ Memoização de componentes (React.memo)
- ✅ Custom hooks para lógica reutilizável
- ✅ Context API para gerenciamento de estado
- ✅ Lazy loading de canais
- ✅ Compressão de respostas (gzip)

**Segurança & Qualidade**
- ✅ Validação de dados com Joi
- ✅ Rate limiting por endpoint
- ✅ Helmet para headers de segurança
- ✅ Logging estruturado com Winston
- ✅ Tratamento de erros centralizado
- ✅ CORS configurável

### 🚀 Plataformas Suportadas

- 📱 **Android/Android TV** (APK nativo)
- 🍎 **iOS/tvOS** (via React Native)
- 🌐 **Web** (via React Native Web)
- 📺 **Samsung Tizen** (build web)
- 📺 **LG webOS** (build web)
- 📺 **Roku** (BrightScript - template incluído)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native 0.72** - Framework mobile
- **React 18.2** - Biblioteca UI
- **Context API** - Gerenciamento de estado
- **React Native Video** - Player de vídeo
- **AsyncStorage** - Armazenamento local
- **NetInfo** - Detecção de rede
- **FastImage** - Cache de imagens
- **i18next** - Internacionalização
- **Vector Icons** - Ícones Material Design
- **React Native Gradient** - Gradientes
- **Axios** - Cliente HTTP

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express 4.18** - Framework web
- **Joi** - Validação de dados
- **Helmet** - Segurança HTTP
- **Winston** - Logging estruturado
- **Express Rate Limit** - Rate limiting
- **Compression** - Compressão gzip
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing
- **Axios** - Download de listas M3U

## 📦 Estrutura do Projeto

```
CS_Criador/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ChannelList/
│   │   │   ├── ChannelItem.js
│   │   │   ├── ChannelList.js
│   │   │   └── styles.js
│   │   ├── VideoPlayer/
│   │   │   └── Player.js
│   │   └── Activation/
│   │       └── ActivationForm.js
│   ├── screens/             # Telas da aplicação
│   │   ├── HomeScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── HistoryScreen.js
│   │   └── SettingsScreen.js
│   ├── context/             # Context API
│   │   ├── ThemeContext.js
│   │   └── AppContext.js
│   ├── hooks/               # Custom hooks
│   │   ├── useDebounce.js
│   │   ├── useFavorites.js
│   │   ├── useChannels.js
│   │   ├── usePlayer.js
│   │   └── useNetworkStatus.js
│   ├── services/            # Camada de serviços
│   │   ├── api.js
│   │   └── storage.js
│   ├── utils/               # Utilitários
│   │   ├── constants.js
│   │   └── helpers.js
│   └── i18n/                # Internacionalização
│       └── index.js
├── backend/
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validator.js
│   ├── routes/              # Rotas da API
│   │   ├── activation.js
│   │   ├── channels.js
│   │   └── groups.js
│   ├── services/            # Lógica de negócio
│   │   ├── m3uParser.js
│   │   └── channelService.js
│   ├── utils/               # Utilitários backend
│   │   └── logger.js
│   ├── logs/                # Arquivos de log
│   ├── index.js             # Servidor Express
│   ├── package.json
│   ├── .env.example
│   ├── .env
│   └── README.md
├── docs/
│   └── BUILD_TIZEN_WEBOS.md
├── extras/
│   └── roku/
│       └── Main.brs
├── App.js                   # Entry point
├── package.json
├── babel.config.js
├── metro.config.js
├── README.md
└── .gitignore
```

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js 18+** instalado
- **npm** ou **yarn**
- **Android Studio** (para Android) ou **Xcode** (para iOS)
- Dispositivo físico ou emulador configurado

### 1️⃣ Instalação do Backend

```powershell
# Entre no diretório backend
cd backend

# Instale as dependências
npm install

# Configure variáveis de ambiente
copy .env.example .env
# Edite .env se necessário

# Inicie o servidor
npm start
# Ou para desenvolvimento com auto-reload
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### 2️⃣ Instalação do Frontend

```powershell
# Volte ao diretório raiz
cd ..

# Instale as dependências
npm install

# Para Android
npm run android

# Para iOS (macOS apenas)
npm run ios

# Para Web (desenvolvimento)
npm run web
```

O servidor estará rodando em `http://localhost:3000`

---

## 📱 Como Usar

### Ativação de Lista M3U

1. Abra o aplicativo
2. Na tela de ativação, insira:
   - **Código de ativação** (opcional, padrão: "DEFAULT")
   - **URL da lista M3U** (obrigatório)
3. Clique em "Ativar"
4. Aguarde o carregamento dos canais

### Reprodução de Canais

1. Após ativar, navegue pela lista de canais
2. Use a busca para filtrar canais
3. Clique em um canal para reproduzir
4. Use os controles do player para pausar/retomar

---

## 🔌 API Backend

### Endpoints Disponíveis

#### `POST /activate`
Ativa uma lista M3U

**Requisição:**
```json
{
  "m3uUrl": "http://exemplo.com/lista.m3u",
  "activationCode": "CODIGO123"
}
```

**Resposta:**
```json
{
  "success": true,
  "channelCount": 150,
  "activationCode": "CODIGO123",
  "activatedAt": "2025-12-01T10:00:00.000Z"
}
```

#### `GET /channels?page=1&limit=50&search=ESPN`
Lista canais com paginação e busca

**Resposta:**
```json
{
  "success": true,
  "channels": [...],
  "total": 150,
  "page": 1,
  "limit": 50,
  "hasMore": true
}
```

#### `GET /groups`
Lista todos os grupos/categorias

#### `GET /channel/:id`
Busca canal específico por ID

#### `GET /status`
Status do servidor e estatísticas

#### `GET /verify/:code`
Verifica validade de código de ativação

---

## 📺 Builds para TVs

### Samsung Tizen e LG webOS

Veja o guia completo em [`docs/BUILD_TIZEN_WEBOS.md`](docs/BUILD_TIZEN_WEBOS.md)

**Resumo:**

1. Adaptar código para `react-native-web`
2. Gerar build estático: `npm run build:web`
3. Empacotar usando ferramentas específicas da plataforma

### Roku

Template básico em BrightScript disponível em `extras/roku/Main.brs`

---

## 🎨 Personalização

### Cores e Temas

Edite o arquivo `App.js` na seção `StyleSheet.create()`:

```javascript
const styles = StyleSheet.create({
  // Altere as cores aqui
  container: {
    backgroundColor: '#000', // Fundo principal
  },
  activateButton: {
    backgroundColor: '#007AFF', // Cor do botão
  },
  // ...
});
```

### URL do Backend

No `App.js`, linha 19:

```javascript
const API_URL = 'http://SEU-SERVIDOR:3000';
```

---

## 🔄 Próximos Passos / Melhorias

### Básicas
- [ ] Persistência com MongoDB
- [ ] Sistema de autenticação de usuários
- [ ] Histórico de canais assistidos
- [ ] Canais favoritos

### Avançadas
- [ ] Cache inteligente de streams
- [ ] Pré-carregamento para zapping rápido
- [ ] EPG (guia de programação)
- [ ] Gravação de programas
- [ ] Suporte a VOD (vídeo sob demanda)
- [ ] Multi-idioma (i18n)
- [ ] Controle parental
- [ ] Sincronização entre dispositivos

### Otimizações
- [ ] Processamento de listas grandes em background
- [ ] Compressão de imagens de logos
- [ ] CDN para distribuição de conteúdo
- [ ] Analytics e telemetria

---

## 🐛 Solução de Problemas

### Erro ao buscar M3U
- Verifique se a URL está acessível
- Certifique-se de que o backend está rodando
- Confira logs no console do backend

### Player não reproduz
- Verifique se a URL do stream é válida
- Teste o stream em outro player (VLC)
- Verifique permissões de internet no dispositivo

### Build falha
- Limpe cache: `npx react-native clean`
- Reinstale dependências: `rm -rf node_modules && npm install`
- Verifique versões do Node.js e React Native

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para problemas ou dúvidas:

- Abra uma issue no GitHub
- Consulte a documentação
- Verifique os logs do servidor

---

## ⚠️ Aviso Legal

Este software é apenas para fins educacionais. O uso de conteúdo IPTV deve estar em conformidade com as leis locais e direitos autorais. Os desenvolvedores não se responsabilizam pelo uso indevido.

---

## 🎯 Status do Projeto

✅ **Frontend:** Completo e funcional  
✅ **Backend:** API RESTful operacional  
⚠️ **Persistência:** Em memória (implementar MongoDB)  
⚠️ **Autenticação:** Não implementado  
✅ **Documentação:** Completa  

---

**Desenvolvido com ❤️ usando React Native e Node.js**
