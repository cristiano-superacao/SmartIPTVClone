# Gerenciador de Playlists - Múltiplos Servidores

## 📋 Visão Geral

O **Gerenciador de Playlists** permite adicionar e gerenciar múltiplas listas IPTV de diferentes tipos de servidores, incluindo **M3U URLs**, **Xtream Codes API** e **Stalker Portal**.

## 🎯 Funcionalidades

### 1. **Suporte a Múltiplos Formatos**

#### 📺 M3U URL (Tradicional)
- URL direta para arquivo M3U/M3U8
- Suporta listas públicas e privadas
- Exemplo: `https://exemplo.com/lista.m3u`

#### 🔐 Xtream Codes API
- Formato usado por serviços profissionais
- Requer: Servidor, Usuário e Senha
- Exemplo: `https://dt323.com`
- Formato da URL: `/get.php?username=XXX&password=XXX&type=m3u_plus&output=ts`

#### 🌐 Stalker Portal
- Middleware para Set-Top Boxes
- Requer: Servidor, Usuário e Senha
- Usado em dispositivos MAG e similares

### 2. **Editor Visual**

#### ✨ Personalização
- **Nome**: Título descritivo da playlist
- **Descrição**: Informações adicionais
- **Logo**: Imagem personalizada (upload)
- **Cor**: Escolha de cor temática

#### 📸 Upload de Imagens
- Suporte para logos personalizados
- Seleção via galeria
- Preview em tempo real

#### 🎨 Seletor de Cores
- Color picker interativo
- Preview instantâneo
- Códigos HEX

### 3. **Gerenciamento de Listas**

#### ➕ Criar Nova Playlist
```javascript
POST /api/playlists
{
  "name": "Minha Lista IPTV",
  "description": "Descrição opcional",
  "serverType": "xtream",
  "serverUrl": "https://servidor.com",
  "username": "usuario123",
  "password": "senha123",
  "outputFormat": "m3u_plus",
  "logo": "https://...",
  "color": "#007AFF"
}
```

#### 📝 Editar Playlist
```javascript
PUT /api/playlists/:id
{
  "name": "Novo Nome",
  "description": "Nova descrição",
  "logo": "https://...",
  "color": "#FF5722",
  "enabled": true
}
```

#### ▶️ Ativar Playlist
```javascript
POST /api/playlists/:id/activate
```
- Baixa e processa a lista M3U
- Armazena canais no servidor
- Retorna estatísticas

#### 🔄 Atualizar Canais
```javascript
POST /api/playlists/:id/refresh
```
- Recarrega lista do servidor
- Atualiza canais
- Mantém configurações

#### 🗑️ Excluir Playlist
```javascript
DELETE /api/playlists/:id
```
- Remove playlist
- Desativa canais associados

### 4. **Visualização e Estatísticas**

#### 📊 Informações da Playlist
- Total de canais
- Total de grupos/categorias
- Tipo de servidor
- Data da última atualização

#### 📈 Estatísticas Detalhadas
```javascript
GET /api/playlists/:id/stats
{
  "totalChannels": 205,
  "totalGroups": 32,
  "channelsWithLogo": 180,
  "channelsWithTvgId": 195,
  "playlist": {
    "id": "playlist_xxx",
    "name": "Minha Lista",
    "enabled": true,
    "lastUpdate": "2025-01-12T12:00:00Z"
  }
}
```

## 🛠️ Implementação Técnica

### Backend (Node.js/Express)

#### Estrutura de Arquivos
```
backend/
├── routes/
│   └── playlists.js         # Rotas de gerenciamento
├── services/
│   └── playlistService.js   # Lógica de negócio
└── index.js                 # Registro das rotas
```

#### Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/playlists` | Criar playlist |
| GET | `/api/playlists` | Listar todas |
| GET | `/api/playlists/:id` | Buscar específica |
| PUT | `/api/playlists/:id` | Atualizar |
| DELETE | `/api/playlists/:id` | Excluir |
| POST | `/api/playlists/:id/activate` | Ativar e carregar |
| POST | `/api/playlists/:id/refresh` | Atualizar canais |
| GET | `/api/playlists/:id/stats` | Estatísticas |

#### Geração de URLs

O serviço `playlistService.js` gera automaticamente a URL correta baseado no tipo de servidor:

**M3U URL:**
```javascript
return serverUrl; // URL direta
```

**Xtream Codes:**
```javascript
return `${serverUrl}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;
```

**Stalker Portal:**
```javascript
return `${serverUrl}/portal.php?type=itv&action=get_ordered_list&genre=*&force_ch_link_check=&fav=0&sortby=number&hd=0&JsHttpRequest=1-xml`;
```

### Frontend (React Native)

#### Componente Principal
```
src/components/Playlists/PlaylistManager.js
```

#### Funcionalidades do Componente

**Estados:**
```javascript
const [playlists, setPlaylists] = useState([]);
const [loading, setLoading] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [editMode, setEditMode] = useState(false);
const [currentPlaylist, setCurrentPlaylist] = useState({...});
```

**Formulário de Criação/Edição:**
- Validação de campos obrigatórios
- Upload de imagem via ImagePicker
- Seletor de tipo de servidor (botões)
- Color picker interativo
- Campos condicionais (username/password para Xtream/Stalker)

**Cards de Playlist:**
- Logo ou placeholder colorido
- Nome e descrição
- Metadados (canais, tipo de servidor)
- Ações: Ativar, Editar, Excluir

#### Integração com API

Serviço `apiService.js` estendido com métodos:

```javascript
// Criar
await apiService.createPlaylist(playlistData);

// Listar
const data = await apiService.getPlaylists();

// Ativar
const result = await apiService.activatePlaylist(id);

// Atualizar
await apiService.updatePlaylist(id, updates);

// Excluir
await apiService.deletePlaylist(id);
```

#### Navegação

Acesso via menu de configurações:

```javascript
navigation.navigate('PlaylistManager');
```

## 📱 Interface do Usuário

### Tela Principal do Gerenciador

```
┌─────────────────────────────────┐
│  Gerenciar Playlists            │
│  2 listas                   [+] │
├─────────────────────────────────┤
│  ┌──────────┐                   │
│  │  [LOGO]  │  Minha Lista IPTV │
│  │          │  205 canais       │
│  │          │  xtream           │
│  └──────────┘                   │
│  [Ativar] [✏️] [🗑️]            │
├─────────────────────────────────┤
│  ┌──────────┐                   │
│  │  [LOGO]  │  TV On-Line       │
│  │          │  150 canais       │
│  │          │  m3u_url          │
│  └──────────┘                   │
│  [Ativar] [✏️] [🗑️]            │
└─────────────────────────────────┘
```

### Modal de Criação/Edição

```
┌─────────────────────────────────┐
│  [X]  Nova Playlist             │
├─────────────────────────────────┤
│                                 │
│      ┌──────────────┐           │
│      │  Adicionar   │           │
│      │    Logo      │           │
│      └──────────────┘           │
│                                 │
│  Nome da Playlist *             │
│  ┌──────────────────────────┐  │
│  │ Ex: Minha Lista IPTV     │  │
│  └──────────────────────────┘  │
│                                 │
│  Descrição                      │
│  ┌──────────────────────────┐  │
│  │ Descrição opcional       │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  Tipo de Servidor *             │
│  [M3U URL] [Xtream] [Stalker]  │
│                                 │
│  Servidor *                     │
│  ┌──────────────────────────┐  │
│  │ https://servidor.com     │  │
│  └──────────────────────────┘  │
│                                 │
│  Usuário *                      │
│  ┌──────────────────────────┐  │
│  │ nome de usuário          │  │
│  └──────────────────────────┘  │
│                                 │
│  Senha *                        │
│  ┌──────────────────────────┐  │
│  │ ••••••••                 │  │
│  └──────────────────────────┘  │
│                                 │
│  Cor da Playlist                │
│  ┌──────────────────────────┐  │
│  │      #007AFF             │  │
│  └──────────────────────────┘  │
│  [Color Picker Wheel]           │
│                                 │
│  ┌──────────────────────────┐  │
│  │  ✓ Salvar Playlist       │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

## 🔐 Exemplo Xtream Codes

### Dados de Acesso
```
Servidor: https://dt323.com
Porta: 80
Usuário: 682585541
Senha: 830433664
```

### URL Gerada
```
https://dt323.com/get.php?username=682585541&password=830433664&type=m3u_plus&output=ts
```

### Formatos Suportados
- `m3u`: M3U básico
- `m3u_plus`: M3U com informações estendidas (EPG)
- `m3u8`: HTTP Live Streaming
- `ts`: Transport Stream

## 🎨 Personalização Visual

### Cores Disponíveis
- Azul: `#007AFF` (padrão)
- Verde: `#4CAF50`
- Vermelho: `#F44336`
- Roxo: `#9C27B0`
- Laranja: `#FF9800`
- Custom: Color picker livre

### Logos
- Tamanho recomendado: 400x400px
- Formatos: JPG, PNG, WebP
- Aspect ratio: 4:3 ou 1:1
- Upload via galeria do dispositivo

## 📊 Fluxo de Ativação

```
1. Usuário preenche formulário
   ↓
2. Frontend valida campos
   ↓
3. POST /api/playlists (cria playlist)
   ↓
4. Backend gera URL baseado no tipo
   ↓
5. POST /api/playlists/:id/activate
   ↓
6. Backend baixa M3U do servidor
   ↓
7. Parser valida e extrai canais
   ↓
8. Canais armazenados em memória
   ↓
9. Estatísticas retornadas
   ↓
10. Frontend exibe sucesso + stats
```

## 🔄 Migração do Sistema Antigo

### Antes (Sistema Simples)
- 1 lista por vez
- Apenas M3U URL
- Sem personalização

### Depois (Sistema Novo)
- Múltiplas listas simultâneas
- 3 tipos de servidor
- Editor visual completo
- Logos e cores personalizadas

### Compatibilidade
- Sistema antigo ainda funciona
- Rota `/api/activate` mantida
- Novo sistema usa `/api/playlists`

## 🚀 Próximos Passos

### Melhorias Futuras
- [ ] Agendamento de atualização automática
- [ ] Sincronização entre dispositivos
- [ ] Backup/restore de playlists
- [ ] Compartilhamento de listas
- [ ] Editor de canais individual
- [ ] Reordenação de canais
- [ ] Grupos/categorias personalizadas
- [ ] Testes de velocidade de servidor
- [ ] Notificações de lista offline

## 📝 Notas Importantes

1. **Segurança**: Senhas são ocultadas na listagem (`********`)
2. **Armazenamento**: Playlists e canais em memória (reiniciar = perder dados)
3. **Limite**: Recomendado até 10 playlists simultâneas
4. **Timeout**: Download de M3U tem timeout de 30 segundos
5. **Tamanho**: M3U máximo de 100MB

## 🐛 Troubleshooting

### Erro: "URL do servidor é obrigatório"
- Verifique se preencheu o campo "Servidor"

### Erro: "Usuário e senha são obrigatórios"
- Para Xtream/Stalker, ambos campos são obrigatórios

### Erro: "Erro ao carregar playlist"
- Verifique conexão de internet
- Confirme credenciais do servidor
- Teste URL manualmente no navegador

### Lista vazia após ativar
- Servidor pode estar offline
- Formato M3U inválido
- URL incorreta

## 📚 Referências

- [M3U Format Specification](https://en.wikipedia.org/wiki/M3U)
- [Xtream Codes API Documentation](https://github.com/tellytv/go.xtream-codes)
- [Stalker Portal Documentation](https://github.com/azhurb/stb-emulator)

---

**Versão:** 2.0.0  
**Data:** 12/01/2025  
**Autor:** SmartIPTV Clone Team
