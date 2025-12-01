# 🧪 Guia de Testes - Sistema de Múltiplas Playlists

## 📋 Checklist de Testes

### ✅ Backend - API de Playlists

#### 1. **Criar Playlist (POST /api/playlists)**

**Teste 1.1: Criar playlist M3U URL**
```bash
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lista Brasil",
    "description": "Canais brasileiros gratuitos",
    "serverType": "m3u_url",
    "serverUrl": "https://iptv-org.github.io/iptv/countries/br.m3u",
    "outputFormat": "m3u_plus",
    "color": "#4CAF50"
  }'
```

**Resultado Esperado:**
- Status: 201 Created
- Retorna objeto playlist com ID gerado
- Campo `fullUrl` contém a URL completa

**Teste 1.2: Criar playlist Xtream Codes**
```bash
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TV On-Line",
    "description": "Lista Xtream Codes",
    "serverType": "xtream",
    "serverUrl": "https://dt323.com",
    "username": "682585541",
    "password": "830433664",
    "outputFormat": "m3u_plus",
    "color": "#007AFF"
  }'
```

**Resultado Esperado:**
- Status: 201 Created
- Campo `fullUrl` deve conter: `.../get.php?username=682585541&password=830433664&type=m3u_plus&output=ts`

**Teste 1.3: Validação de campos obrigatórios**
```bash
# Sem nome
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "serverType": "m3u_url",
    "serverUrl": "https://exemplo.com/lista.m3u"
  }'
```

**Resultado Esperado:**
- Status: 400 Bad Request
- Erro: "name is required"

**Teste 1.4: Validação Xtream sem credenciais**
```bash
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "serverType": "xtream",
    "serverUrl": "https://servidor.com"
  }'
```

**Resultado Esperado:**
- Status: 400 Bad Request
- Erro: username/password obrigatórios para xtream

---

#### 2. **Listar Playlists (GET /api/playlists)**

**Teste 2.1: Listar todas as playlists**
```bash
curl http://localhost:3000/api/playlists
```

**Resultado Esperado:**
```json
{
  "success": true,
  "playlists": [
    {
      "id": "playlist_xxx",
      "name": "Lista Brasil",
      "description": "...",
      "serverType": "m3u_url",
      "serverUrl": "...",
      "password": "",
      "channelCount": 0,
      "enabled": true,
      "createdAt": "2025-01-12T..."
    }
  ],
  "total": 1
}
```

**Verificações:**
- Array de playlists
- Senhas ocultas (********)
- Total correto

---

#### 3. **Buscar Playlist (GET /api/playlists/:id)**

**Teste 3.1: Buscar playlist existente**
```bash
curl http://localhost:3000/api/playlists/playlist_xxx
```

**Resultado Esperado:**
- Status: 200 OK
- Objeto playlist completo

**Teste 3.2: Buscar playlist inexistente**
```bash
curl http://localhost:3000/api/playlists/invalid_id
```

**Resultado Esperado:**
- Status: 404 Not Found
- Erro: "Playlist não encontrada"

---

#### 4. **Atualizar Playlist (PUT /api/playlists/:id)**

**Teste 4.1: Atualizar nome e descrição**
```bash
curl -X PUT http://localhost:3000/api/playlists/playlist_xxx \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Nome",
    "description": "Nova descrição",
    "color": "#FF5722"
  }'
```

**Resultado Esperado:**
- Status: 200 OK
- Campos atualizados
- Campo `updatedAt` modificado

**Teste 4.2: Desabilitar playlist**
```bash
curl -X PUT http://localhost:3000/api/playlists/playlist_xxx \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": false
  }'
```

**Resultado Esperado:**
- Status: 200 OK
- Campo `enabled: false`

---

#### 5. **Ativar Playlist (POST /api/playlists/:id/activate)**

**Teste 5.1: Ativar playlist M3U**
```bash
curl -X POST http://localhost:3000/api/playlists/playlist_xxx/activate
```

**Resultado Esperado:**
```json
{
  "success": true,
  "message": "Playlist ativada com sucesso",
  "playlist": {
    "id": "playlist_xxx",
    "channelCount": 205,
    "lastUpdate": "2025-01-12T..."
  },
  "stats": {
    "totalChannels": 205,
    "totalGroups": 32,
    "channelsWithLogo": 180,
    "channelsWithTvgId": 195
  }
}
```

**Verificações:**
- Status: 200 OK
- `channelCount` atualizado na playlist
- `lastUpdate` preenchido
- Stats corretas

**Teste 5.2: Ativar playlist com URL inválida**
```bash
# Criar playlist com URL inválida
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Inválido",
    "serverType": "m3u_url",
    "serverUrl": "https://urlquenoexiste.com/404.m3u"
  }'

# Tentar ativar
curl -X POST http://localhost:3000/api/playlists/[id]/activate
```

**Resultado Esperado:**
- Status: 500 Internal Server Error
- Erro: "Erro ao carregar playlist"

---

#### 6. **Atualizar Canais (POST /api/playlists/:id/refresh)**

**Teste 6.1: Refresh playlist ativa**
```bash
curl -X POST http://localhost:3000/api/playlists/playlist_xxx/refresh
```

**Resultado Esperado:**
- Status: 200 OK
- Mesma resposta do activate
- `lastUpdate` atualizado

---

#### 7. **Estatísticas (GET /api/playlists/:id/stats)**

**Teste 7.1: Stats de playlist ativa**
```bash
curl http://localhost:3000/api/playlists/playlist_xxx/stats
```

**Resultado Esperado:**
```json
{
  "success": true,
  "stats": {
    "totalChannels": 205,
    "totalGroups": 32,
    "channelsWithLogo": 180,
    "channelsWithTvgId": 195,
    "playlist": {
      "id": "playlist_xxx",
      "name": "Lista Brasil",
      "enabled": true,
      "lastUpdate": "..."
    }
  }
}
```

---

#### 8. **Excluir Playlist (DELETE /api/playlists/:id)**

**Teste 8.1: Excluir playlist**
```bash
curl -X DELETE http://localhost:3000/api/playlists/playlist_xxx
```

**Resultado Esperado:**
- Status: 200 OK
- Mensagem: "Playlist removida com sucesso"
- Canais desativados no channelService

**Teste 8.2: Excluir playlist inexistente**
```bash
curl -X DELETE http://localhost:3000/api/playlists/invalid_id
```

**Resultado Esperado:**
- Status: 404 Not Found

---

### ✅ Frontend - PlaylistManager Component

#### 9. **Interface Visual**

**Teste 9.1: Renderização inicial**
- [ ] Header com título "Gerenciar Playlists"
- [ ] Contador de listas
- [ ] Botão FAB (+) visível
- [ ] Estado vazio se não houver playlists

**Teste 9.2: Modal de criação**
- [ ] Botão FAB abre modal
- [ ] Título "Nova Playlist"
- [ ] Todos os campos renderizados
- [ ] Botão "Salvar Playlist" visível

**Teste 9.3: Seletor de tipo de servidor**
- [ ] 3 botões: M3U URL, Xtream Codes, Stalker
- [ ] Botão selecionado muda de cor
- [ ] Campos condicionais aparecem (username/password)

---

#### 10. **Upload de Imagem**

**Teste 10.1: Seleção de logo**
- [ ] Toque no placeholder abre galeria
- [ ] Imagem selecionada aparece em preview
- [ ] URI da imagem salva no estado

**Teste 10.2: Color picker**
- [ ] Toque no preview de cor abre picker
- [ ] Roda de cores funciona
- [ ] Cor selecionada atualiza preview
- [ ] Código HEX exibido

---

#### 11. **Validação de Formulário**

**Teste 11.1: Nome vazio**
- [ ] Não preencher nome
- [ ] Tentar salvar
- [ ] Alert: "Nome da playlist é obrigatório"

**Teste 11.2: URL vazia**
- [ ] Não preencher URL
- [ ] Tentar salvar
- [ ] Alert: "URL do servidor é obrigatório"

**Teste 11.3: Xtream sem credenciais**
- [ ] Selecionar Xtream Codes
- [ ] Preencher apenas servidor
- [ ] Tentar salvar
- [ ] Alert: "Usuário e senha são obrigatórios..."

---

#### 12. **CRUD de Playlists**

**Teste 12.1: Criar playlist**
- [ ] Preencher todos os campos
- [ ] Salvar
- [ ] Toast de sucesso
- [ ] Modal fecha
- [ ] Lista atualiza com nova playlist

**Teste 12.2: Editar playlist**
- [ ] Toque no botão editar (✏️)
- [ ] Modal abre com dados preenchidos
- [ ] Alterar nome e cor
- [ ] Salvar
- [ ] Toast de sucesso
- [ ] Card atualiza

**Teste 12.3: Ativar playlist**
- [ ] Toque no botão "Ativar"
- [ ] Loading indicator
- [ ] Toast com quantidade de canais
- [ ] `channelCount` atualiza no card

**Teste 12.4: Excluir playlist**
- [ ] Toque no botão excluir (🗑️)
- [ ] Alert de confirmação
- [ ] Confirmar exclusão
- [ ] Toast de sucesso
- [ ] Playlist removida da lista

---

#### 13. **Refresh e Loading**

**Teste 13.1: Pull to refresh**
- [ ] Arrastar lista para baixo
- [ ] Spinner de refresh aparece
- [ ] Lista recarrega

**Teste 13.2: Loading states**
- [ ] Loading ao criar playlist
- [ ] Loading ao ativar
- [ ] Loading ao excluir
- [ ] Botão desabilitado durante loading

---

### ✅ Integração Completa

#### 14. **Fluxo End-to-End**

**Cenário 1: Primeira playlist**
1. [ ] Abrir app
2. [ ] Ir em Configurações → Gerenciar Playlists
3. [ ] Toque no FAB (+)
4. [ ] Preencher formulário M3U URL
5. [ ] Adicionar logo
6. [ ] Escolher cor
7. [ ] Salvar
8. [ ] Ativar playlist
9. [ ] Verificar canais carregados

**Cenário 2: Múltiplas playlists**
1. [ ] Criar 3 playlists diferentes
2. [ ] 1x M3U URL
3. [ ] 1x Xtream Codes
4. [ ] 1x Stalker
5. [ ] Ativar cada uma
6. [ ] Verificar contagem de canais
7. [ ] Editar nome de uma
8. [ ] Excluir outra
9. [ ] Atualizar (refresh) uma

**Cenário 3: Xtream Codes real**
1. [ ] Criar playlist Xtream
2. [ ] Usar servidor: `https://dt323.com`
3. [ ] User: `682585541`
4. [ ] Pass: `830433664`
5. [ ] Ativar
6. [ ] Verificar URL gerada
7. [ ] Verificar canais carregados

---

### ✅ Compatibilidade com Sistema Antigo

#### 15. **Backward Compatibility**

**Teste 15.1: Rota antiga ainda funciona**
```bash
curl -X POST http://localhost:3000/api/activate \
  -H "Content-Type: application/json" \
  -d '{
    "m3uUrl": "https://iptv-org.github.io/iptv/countries/br.m3u",
    "activationCode": "TEST123"
  }'
```

**Resultado Esperado:**
- Status: 200 OK
- Sistema antigo funcional
- Não interfere com novo sistema

---

## 📊 Resultados Esperados

### Métricas de Sucesso
- ✅ Todos os endpoints da API funcionando
- ✅ Validações corretas
- ✅ Interface responsiva e profissional
- ✅ Sem crashes ou erros no console
- ✅ Performance aceitável (<2s para criar/ativar)

### Logs do Backend
```
[INFO] Playlist criada: playlist_xxx - Lista Brasil
[INFO] Ativando playlist: playlist_xxx - Lista Brasil
[INFO] 205 canais armazenados para código: playlist_xxx
[INFO] Playlist ativada: playlist_xxx - 205 canais
```

### Toasts do Frontend
- ✅ "Playlist criada com sucesso"
- ✅ "Playlist atualizada com sucesso"
- ✅ "Playlist ativada com sucesso - 205 canais carregados"
- ✅ "Playlist excluída com sucesso"
- ❌ "Erro ao salvar playlist" (em caso de erro)

---

## 🐛 Bugs Conhecidos / Limitações

1. **Armazenamento em memória**: Playlists são perdidas ao reiniciar o servidor
2. **Sem persistência**: Ideal adicionar banco de dados
3. **Limite de tamanho**: M3U máximo de 100MB
4. **Timeout**: 30 segundos para download
5. **Validação de URL**: Não verifica se URL é realmente um M3U válido antes de salvar

---

## 🚀 Próximos Testes

- [ ] Teste de carga (10+ playlists simultâneas)
- [ ] Teste de timeout (servidor lento)
- [ ] Teste de M3U gigante (>50MB)
- [ ] Teste de conexão intermitente
- [ ] Teste de caracteres especiais no nome
- [ ] Teste de URLs malformadas
- [ ] Teste de memória (memory leak?)

---

**Versão:** 2.0.0  
**Data:** 12/01/2025  
**Testador:** _______________  
**Status:** [ ] Aprovado [ ] Reprovado [ ] Parcial
