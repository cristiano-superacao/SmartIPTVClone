# 📺 SmartIPTV Clone v2.0 - Gerenciador de Múltiplas Playlists

## 🆕 Nova Funcionalidade: Múltiplas Playlists com Editor Visual

### ✨ O que há de novo?

Agora você pode **adicionar e gerenciar múltiplas listas IPTV** de diferentes fontes, com suporte a:

- 📝 **M3U URL** - Links diretos para arquivos M3U/M3U8
- 🔐 **Xtream Codes API** - Formato profissional com usuário/senha
- 🌐 **Stalker Portal** - Para dispositivos MAG e similares

### 🎨 Editor Visual Profissional

- **Logos Personalizados**: Adicione imagens para cada playlist
- **Cores Temáticas**: Escolha cores únicas via color picker
- **Interface Responsiva**: Design moderno e intuitivo
- **Gerenciamento Completo**: Criar, editar, ativar e excluir playlists

---

## 📸 Preview

### Tela do Gerenciador
```
┌─────────────────────────────────┐
│  Gerenciar Playlists        [+] │
├─────────────────────────────────┤
│  🖼️ Lista Brasil IPTV          │
│     205 canais • m3u_url       │
│     [Ativar] [✏️] [🗑️]        │
├─────────────────────────────────┤
│  🖼️ TV On-Line Xtream          │
│     150 canais • xtream        │
│     [Ativar] [✏️] [🗑️]        │
└─────────────────────────────────┘
```

### Formulário de Criação
```
┌─────────────────────────────────┐
│  [X]  Nova Playlist             │
├─────────────────────────────────┤
│  📷 [Adicionar Logo]            │
│                                 │
│  Nome: ________________         │
│  Descrição: ___________         │
│                                 │
│  Tipo: [M3U] [Xtream] [Stalker]│
│                                 │
│  Servidor: _____________        │
│  Usuário: ______________        │
│  Senha: ****************        │
│                                 │
│  Cor: [#007AFF] [🎨]           │
│                                 │
│  [✓ Salvar Playlist]            │
└─────────────────────────────────┘
```

---

## 🚀 Como Usar

### 1. Acessar o Gerenciador

1. Abra o aplicativo
2. Vá em **Configurações** (ícone ⚙️)
3. Toque em **"Gerenciar Playlists"**

### 2. Adicionar Nova Playlist

#### 📝 Usando M3U URL (Simples)

1. Toque no botão **+** (FAB)
2. Selecione **"M3U URL"**
3. Preencha:
   - **Nome**: Ex: "Minha Lista IPTV"
   - **URL**: `https://servidor.com/lista.m3u`
4. (Opcional) Adicione logo e escolha cor
5. Toque em **"Salvar Playlist"**
6. Toque em **"Ativar"** para carregar os canais

#### 🔐 Usando Xtream Codes (Profissional)

1. Toque no botão **+**
2. Selecione **"Xtream Codes"**
3. Preencha:
   - **Nome**: Ex: "TV Premium"
   - **Servidor**: `https://dt323.com`
   - **Usuário**: `682585541`
   - **Senha**: `830433664`
4. (Opcional) Personalize logo e cor
5. Salve e ative

**Exemplo Real (Screenshot):**
```
Servidor: https://dt323.com
Porta: 80
Usuário: 682585541
Senha: 830433664
Formato: m3u_plus
Output: ts
```

### 3. Gerenciar Playlists

- **Ativar**: Carrega os canais do servidor
- **Editar** ✏️: Alterar nome, logo, cor
- **Excluir** 🗑️: Remove a playlist
- **Atualizar**: Arraste para baixo (pull-to-refresh)

---

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (para mobile)

### Backend

```bash
cd backend
npm install
node index.js
```

**Servidor rodará em:** `http://localhost:3000`

### Frontend

```bash
npm install
npm start
# ou
expo start
```

### Dependências Adicionais

```bash
# Se não instalado
npm install expo-image-picker react-native-wheel-color-picker
```

---

## 📡 API Endpoints

### Playlists

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/playlists` | Criar nova playlist |
| `GET` | `/api/playlists` | Listar todas |
| `GET` | `/api/playlists/:id` | Buscar específica |
| `PUT` | `/api/playlists/:id` | Atualizar |
| `DELETE` | `/api/playlists/:id` | Excluir |
| `POST` | `/api/playlists/:id/activate` | Ativar e carregar canais |
| `POST` | `/api/playlists/:id/refresh` | Atualizar canais |
| `GET` | `/api/playlists/:id/stats` | Estatísticas |

### Exemplo de Uso (cURL)

```bash
# Criar playlist
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lista Brasil",
    "serverType": "m3u_url",
    "serverUrl": "https://iptv-org.github.io/iptv/countries/br.m3u"
  }'

# Listar playlists
curl http://localhost:3000/api/playlists

# Ativar playlist
curl -X POST http://localhost:3000/api/playlists/PLAYLIST_ID/activate
```

### Exemplo PowerShell

```powershell
# Teste completo automatizado
.\test-playlists.ps1
```

---

## 📁 Estrutura do Projeto

```
CS_Criador/
├── backend/
│   ├── routes/
│   │   ├── activation.js
│   │   ├── channels.js
│   │   ├── groups.js
│   │   └── playlists.js          ⭐ NOVO
│   ├── services/
│   │   ├── channelService.js
│   │   ├── m3uParser.js
│   │   └── playlistService.js    ⭐ NOVO
│   └── index.js
├── src/
│   ├── components/
│   │   ├── Activation/
│   │   ├── ChannelList/
│   │   ├── Playlists/
│   │   │   └── PlaylistManager.js ⭐ NOVO
│   │   └── VideoPlayer/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── SettingsScreen.js     ⭐ ATUALIZADO
│   │   └── ...
│   └── services/
│       └── api.js                 ⭐ ATUALIZADO
├── docs/
│   ├── PLAYLIST_MANAGER.md        ⭐ NOVO
│   ├── TESTE_PLAYLISTS.md         ⭐ NOVO
│   └── IMPLEMENTACAO_PLAYLISTS.md ⭐ NOVO
├── test-playlists.ps1             ⭐ NOVO
└── README.md
```

---

## 🧪 Testes

### Teste Automatizado (PowerShell)

```powershell
# Certifique-se que o backend está rodando
node backend\index.js

# Em outro terminal
.\test-playlists.ps1
```

**O script testa:**
1. ✅ Health check
2. ✅ Criar playlist M3U
3. ✅ Criar playlist Xtream
4. ✅ Listar playlists
5. ✅ Ativar playlist
6. ✅ Buscar estatísticas
7. ✅ Atualizar playlist

### Teste Manual

Siga o guia completo em: `docs/TESTE_PLAYLISTS.md`

---

## 🎯 Tipos de Servidor Suportados

### 1. M3U URL 📝
**Mais simples, apenas URL necessária**

```json
{
  "serverType": "m3u_url",
  "serverUrl": "https://servidor.com/lista.m3u"
}
```

**URL gerada:** URL direta do arquivo

---

### 2. Xtream Codes API 🔐
**Formato profissional com credenciais**

```json
{
  "serverType": "xtream",
  "serverUrl": "https://dt323.com",
  "username": "682585541",
  "password": "830433664",
  "outputFormat": "m3u_plus"
}
```

**URL gerada:**
```
https://dt323.com/get.php?username=682585541&password=830433664&type=m3u_plus&output=ts
```

**Formatos disponíveis:**
- `m3u` - M3U básico
- `m3u_plus` - M3U com EPG (recomendado)
- `m3u8` - HTTP Live Streaming
- `ts` - Transport Stream

---

### 3. Stalker Portal 🌐
**Para dispositivos MAG e STB**

```json
{
  "serverType": "stalker",
  "serverUrl": "https://portal.com",
  "username": "user",
  "password": "pass"
}
```

**URL gerada:**
```
https://portal.com/portal.php?type=itv&action=get_ordered_list&genre=*&force_ch_link_check=&fav=0&sortby=number&hd=0&JsHttpRequest=1-xml
```

---

## 🎨 Personalização Visual

### Logos
- **Formatos aceitos**: JPG, PNG, WebP
- **Tamanho recomendado**: 400x400px
- **Aspect ratio**: 1:1 ou 4:3
- **Upload via**: Galeria do dispositivo

### Cores
- **Seletor**: Color picker interativo
- **Formato**: Códigos HEX (#RRGGBB)
- **Cores pré-definidas**:
  - Azul: `#007AFF` (padrão)
  - Verde: `#4CAF50`
  - Vermelho: `#F44336`
  - Roxo: `#9C27B0`
  - Laranja: `#FF9800`

---

## 📊 Estatísticas

Ao ativar uma playlist, você recebe:

```json
{
  "totalChannels": 205,
  "totalGroups": 32,
  "channelsWithLogo": 180,
  "channelsWithTvgId": 195
}
```

---

## 🔄 Migração do Sistema Antigo

### Compatibilidade
✅ O sistema antigo continua funcionando  
✅ Rota `/api/activate` mantida  
✅ Novo sistema usa `/api/playlists`

### Vantagens do Novo Sistema
- ✅ Múltiplas listas simultâneas
- ✅ 3 tipos de servidor (vs 1)
- ✅ Editor visual completo
- ✅ Logos e cores personalizadas
- ✅ Melhor gerenciamento

---

## 🐛 Troubleshooting

### Erro: "URL do servidor é obrigatório"
➡️ Preencha o campo "Servidor" ou "URL"

### Erro: "Usuário e senha são obrigatórios"
➡️ Para Xtream/Stalker, ambos campos são necessários

### Erro: "Erro ao carregar playlist"
➡️ Verifique:
- Conexão de internet
- Credenciais do servidor
- URL correta
- Servidor online

### Lista vazia após ativar
➡️ Possíveis causas:
- Servidor offline
- Formato M3U inválido
- Credenciais incorretas

### Backend não inicia
```powershell
# Parar processo na porta 3000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

# Reiniciar
node backend\index.js
```

---

## 📚 Documentação Completa

- **Guia do Usuário**: `docs/PLAYLIST_MANAGER.md`
- **Guia de Testes**: `docs/TESTE_PLAYLISTS.md`
- **Implementação Técnica**: `docs/IMPLEMENTACAO_PLAYLISTS.md`
- **API Original**: `docs/API.md`

---

## 🚀 Próximas Melhorias

- [ ] Persistência em banco de dados (MongoDB/SQLite)
- [ ] Agendamento de atualização automática
- [ ] Sincronização entre dispositivos
- [ ] Backup/restore de playlists
- [ ] Compartilhamento de listas
- [ ] Editor individual de canais
- [ ] Reordenação de canais via drag-drop
- [ ] Grupos/categorias personalizadas
- [ ] Teste de velocidade de servidor
- [ ] Notificações de lista offline

---

## 📝 Changelog

### v2.0.0 (12/01/2025)
- ✨ **NOVO**: Sistema de múltiplas playlists
- ✨ **NOVO**: Suporte a Xtream Codes API
- ✨ **NOVO**: Suporte a Stalker Portal
- ✨ **NOVO**: Editor visual com logos e cores
- ✨ **NOVO**: 8 endpoints de API
- ✨ **NOVO**: Componente PlaylistManager (850+ linhas)
- ✨ **NOVO**: Documentação completa
- 🔧 **MELHORIA**: Interface profissional e responsiva

### v1.0.0
- ✅ Sistema básico com M3U URL único
- ✅ Player de vídeo
- ✅ Lista de canais
- ✅ Favoritos e histórico

---

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).

---

## 🆘 Suporte

- **Documentação**: `docs/`
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/smartiptv-clone/issues)
- **Email**: suporte@exemplo.com

---

## 🌟 Agradecimentos

- [IPTV-org](https://github.com/iptv-org/iptv) - Listas IPTV gratuitas
- [Xtream Codes](https://github.com/tellytv/go.xtream-codes) - Documentação da API
- Comunidade React Native e Expo

---

**Desenvolvido com ❤️ por SmartIPTV Clone Team**  
**Versão 2.0.0** | Janeiro 2025
