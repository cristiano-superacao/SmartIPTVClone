# 🚀 Guia de Início Rápido - SmartIPTV Clone

## ⚡ Começando em 5 Minutos

### 1. Backend (Servidor API)

```powershell
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
copy .env.example .env

# Iniciar servidor
npm start
```

✅ Backend rodando em `http://localhost:3000`

---

### 2. Frontend (Aplicativo)

```powershell
# Voltar à pasta raiz
cd ..

# Instalar dependências
npm install

# Android
npm run android

# iOS (macOS)
npm run ios

# Web
npm run web
```

---

## 📱 Como Usar o App

### 1. Ativar Lista M3U

Na tela inicial, você verá um formulário para ativar sua lista IPTV:

1. **URL da Lista M3U**: Cole a URL da sua playlist
   - Exemplo: `http://example.com/playlist.m3u`
   
2. **Código de Ativação** (opcional): 
   - Se deixar vazio, usa "DEFAULT"
   - Use um código único para múltiplas listas

3. Clique em **"Ativar Lista"**

---

### 2. Navegar pelos Canais

Após ativação:

- **Buscar**: Digite no campo de busca
- **Filtrar por Grupo**: Toque nos chips de categoria
- **Assistir**: Clique em qualquer canal
- **Favoritar**: Toque no ícone de coração

---

### 3. Recursos Adicionais

**Favoritos**
- Adicione canais aos favoritos tocando no ❤️
- Acesse rapidamente pela tela de favoritos

**Histórico**
- Veja canais assistidos recentemente
- Limpe o histórico quando quiser

**Configurações**
- 🌙 Alternar tema escuro/claro
- 🌍 Mudar idioma (PT-BR, EN, ES)
- ⚙️ Ajustar preferências de reprodução

**Status de Rede**
- Banner vermelho aparece quando offline
- Reconexão automática quando online

---

## 🔧 Configuração Avançada

### Variáveis de Ambiente (Backend)

Edite `backend/.env`:

```env
# Servidor
NODE_ENV=development
PORT=3000

# CORS (separar por vírgula)
CORS_ORIGIN=*

# Logs
LOG_LEVEL=info
```

### Mudar URL da API (Frontend)

Edite `src/utils/constants.js`:

```javascript
export const API_URL = 'http://SEU_SERVIDOR:3000/api';
```

---

## 📋 Comandos Úteis

### Backend

```powershell
cd backend

npm start          # Produção
npm run dev        # Desenvolvimento (auto-reload)
```

### Frontend

```powershell
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
npm start          # Metro bundler
```

---

## 🐛 Problemas Comuns

### Backend não inicia

**Erro: porta 3000 em uso**
```powershell
# Mude a porta no .env
PORT=8080
```

**Erro: módulos não encontrados**
```powershell
cd backend
rm -rf node_modules
npm install
```

### Frontend não conecta

**Erro: Network request failed**

1. Verifique se o backend está rodando
2. No Android, use IP da máquina em vez de localhost:
   ```javascript
   // constants.js
   API_URL = 'http://192.168.1.100:3000/api'
   ```

**Erro: Metro bundler**
```powershell
# Limpar cache
npm start -- --reset-cache
```

### Problema com dependências nativas

**Android**
```powershell
cd android
./gradlew clean
cd ..
npm run android
```

**iOS**
```powershell
cd ios
pod install
cd ..
npm run ios
```

---

## 📊 Estrutura de Pastas Simplificada

```
CS_Criador/
├── src/                    # Código do app
│   ├── components/         # Componentes React
│   ├── screens/            # Telas do app
│   ├── context/            # Estado global
│   └── utils/              # Funções utilitárias
├── backend/                # Servidor API
│   ├── routes/             # Endpoints
│   ├── services/           # Lógica de negócio
│   └── middleware/         # Validação, segurança
└── docs/                   # Documentação
```

---

## 🎯 Próximos Passos

1. ✅ Testar com sua lista M3U
2. ✅ Explorar favoritos e histórico
3. ✅ Customizar tema e idioma
4. ✅ Ler documentação completa no README.md
5. ✅ Ver melhorias implementadas em IMPROVEMENTS.md

---

## 📞 Suporte

- **Documentação Completa**: `README.md`
- **Melhorias Detalhadas**: `IMPROVEMENTS.md`
- **Build para TVs**: `docs/BUILD_TIZEN_WEBOS.md`
- **API Backend**: `backend/README.md`

---

**Desenvolvido com ❤️ usando React Native e Node.js**
