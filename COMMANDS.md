# 📋 Comandos Úteis - SmartIPTV Clone

## 🚀 Comandos Rápidos

### Iniciar tudo (Backend + Frontend)
```powershell
npm run dev
```

### Backend apenas
```powershell
# Produção
npm run backend

# Desenvolvimento (auto-reload)
npm run backend:dev
```

### Frontend
```powershell
# Metro bundler
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 🧪 Testes

```powershell
# Rodar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com coverage
npm test -- --coverage
```

---

## 🔍 Linting & Formatação

```powershell
# Verificar erros
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar com Prettier
npx prettier --write "src/**/*.js"
```

---

## 🧹 Limpeza

```powershell
# Limpar node_modules e reinstalar
npm run clean

# Limpar cache do Metro
npm run clean:cache

# Limpar build Android
cd android
./gradlew clean
cd ..

# Limpar pods iOS
cd ios
pod deintegrate
pod install
cd ..
```

---

## 📱 Build para Produção

### Android APK

```powershell
cd android

# Debug APK
./gradlew assembleDebug

# Release APK (requer keystore)
./gradlew assembleRelease

cd ..
```

APK gerado em: `android/app/build/outputs/apk/`

### Android App Bundle (Google Play)

```powershell
cd android
./gradlew bundleRelease
cd ..
```

AAB gerado em: `android/app/build/outputs/bundle/`

### iOS (macOS apenas)

```powershell
# Instalar pods
cd ios
pod install
cd ..

# Build
npx react-native run-ios --configuration Release
```

### Web

```powershell
# Build de produção
npm run build:web
```

Arquivos gerados em: `web-build/`

---

## 🔧 Desenvolvimento

### Abrir DevMenu

- **Android**: Shake o dispositivo ou `Ctrl+M` (emulador) ou `adb shell input keyevent 82`
- **iOS**: `Cmd+D` (simulador) ou shake (dispositivo)
- **Web**: `F12` (Chrome DevTools)

### Reload App

- **Android**: `R+R` (pressione R duas vezes)
- **iOS**: `Cmd+R`
- **Web**: `Ctrl+R` ou `F5`

### Inspecionar Elemento

- **Android**: 
  ```powershell
  adb reverse tcp:8097 tcp:8097
  ```
  Depois abra: `http://localhost:8097/debugger-ui/`

- **iOS**: No Safari > Develop > Simulator

- **Web**: Chrome DevTools (`F12`)

---

## 📊 Logs

### Ver logs do dispositivo

**Android:**
```powershell
# Todos os logs
adb logcat

# Apenas React Native
adb logcat *:S ReactNative:V ReactNativeJS:V

# Limpar logs
adb logcat -c
```

**iOS:**
```powershell
# Abrir console do simulador
xcrun simctl spawn booted log stream --level debug
```

### Logs do Backend

```powershell
# Ver logs combinados
cat backend/logs/combined.log

# Ver apenas erros
cat backend/logs/error.log

# Seguir logs em tempo real (Linux/Mac)
tail -f backend/logs/combined.log
```

---

## 🔌 Conectar Dispositivo Real

### Android via USB

```powershell
# Verificar dispositivos conectados
adb devices

# Se não aparecer, ativar USB debugging no Android

# Reverter porta do Metro
adb reverse tcp:8081 tcp:8081

# Reverter porta do backend
adb reverse tcp:3000 tcp:3000

# Instalar APK
npm run android
```

### Android via WiFi

```powershell
# Conectar via USB primeiro
adb tcpip 5555

# Conectar via IP (substituir pelo IP do dispositivo)
adb connect 192.168.1.100:5555

# Desconectar USB e usar WiFi
npm run android
```

### iOS (macOS)

1. Conectar iPhone/iPad via cabo
2. Confiar no computador no dispositivo
3. Selecionar dispositivo no Xcode
4. `npm run ios`

---

## 🐛 Debug Remoto

### React Native Debugger

```powershell
# Instalar
npm install -g react-native-debugger

# Executar
react-native-debugger
```

### Flipper

```powershell
# Baixar em: https://fbflipper.com/

# Plugins úteis:
# - Network
# - Databases
# - Images
# - Layout
# - Logs
```

---

## 📦 Dependências

### Adicionar nova dependência

```powershell
# Adicionar
npm install nome-da-lib

# Se for nativa, linkar (iOS)
cd ios && pod install && cd ..

# Rebuild
npm run android  # ou npm run ios
```

### Remover dependência

```powershell
# Remover
npm uninstall nome-da-lib

# Limpar
npm run clean
cd ios && pod install && cd ..
```

### Atualizar dependências

```powershell
# Ver outdated
npm outdated

# Atualizar todas (cuidado!)
npm update

# Atualizar específica
npm install nome-da-lib@latest
```

---

## 🌐 Ambiente

### Variáveis de Ambiente

**Frontend:** Editar `src/utils/constants.js`

**Backend:** Editar `backend/.env`

### Trocar URL da API

```javascript
// src/utils/constants.js
export const API_URL = 'http://192.168.1.100:3000/api'; // IP local

// ou
export const API_URL = 'https://api.meuservidor.com/api'; // Produção
```

---

## 🚢 Deploy

### Backend (Node.js)

**Heroku:**
```powershell
cd backend
heroku create meu-app
git push heroku main
```

**DigitalOcean/AWS:**
```powershell
# PM2 para manter rodando
npm install -g pm2
pm2 start backend/index.js --name smartiptv-backend
pm2 save
pm2 startup
```

### Frontend Web

**Netlify/Vercel:**
```powershell
npm run build:web
# Upload da pasta web-build/
```

---

## 📱 Publicação

### Google Play Store

1. Gerar keystore
2. Configurar `android/app/build.gradle`
3. `cd android && ./gradlew bundleRelease`
4. Upload em Google Play Console

### Apple App Store

1. Configurar certificados no Xcode
2. Archive build
3. Upload via Xcode Organizer
4. Submeter no App Store Connect

---

## 🔑 Comandos Backend Específicos

```powershell
cd backend

# Criar logs directory
mkdir logs

# Ver status do servidor
curl http://localhost:3000/health

# Testar endpoint
curl -X POST http://localhost:3000/api/activate \
  -H "Content-Type: application/json" \
  -d '{"m3uUrl": "http://example.com/list.m3u"}'
```

---

## 💡 Dicas

### Performance
- Use `--reset-cache` se tiver cache issues
- Minimize re-renders com React.memo
- Use FlatList para listas grandes
- Ative Hermes engine (Android)

### Debug
- Use React DevTools
- Use Flipper para network
- Console.log é seu amigo
- Use breakpoints no Chrome DevTools

### Produção
- Ative ProGuard (Android)
- Minimize bundle size
- Use imagens otimizadas
- Configure rate limiting
- Use HTTPS

---

**Mais informações:** Consulte README.md e IMPROVEMENTS.md
