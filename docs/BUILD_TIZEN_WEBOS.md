# Build para Samsung Tizen e LG webOS

## 📋 Visão Geral

Este guia explica como gerar builds do SmartIPTV Clone para Smart TVs Samsung (Tizen) e LG (webOS).

---

## 🎯 Pré-requisitos

### Para ambas as plataformas
- Node.js 16+
- Conhecimento básico de linha de comando
- Certificado de desenvolvedor (para builds em produção)

### Samsung Tizen
- [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download) instalado
- Samsung TV física ou emulador Tizen
- Conta de desenvolvedor Samsung

### LG webOS
- [webOS CLI](http://webostv.developer.lge.com/sdk/download/download-sdk/) instalado
- LG TV física ou emulador webOS
- Conta de desenvolvedor LG

---

## 🔧 Passo 1: Adaptar para React Native Web

### 1.1 Instalar dependências web

```powershell
npm install react-native-web react-dom
npm install --save-dev @expo/webpack-config
```

### 1.2 Criar configuração webpack

Crie `webpack.config.js` na raiz:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.json'],
  },
};
```

### 1.3 Criar arquivo de entrada web

Crie `index.web.js`:

```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
```

### 1.4 Criar HTML template

Crie `public/index.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartIPTV Clone</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000;
            overflow: hidden;
        }
        #app-root {
            width: 100vw;
            height: 100vh;
        }
    </style>
</head>
<body>
    <div id="app-root"></div>
</body>
</html>
```

---

## 🏗️ Passo 2: Gerar Build Web

### 2.1 Atualizar package.json

Adicione scripts de build:

```json
{
  "scripts": {
    "build:web": "webpack --mode production",
    "serve:web": "webpack serve --mode development"
  }
}
```

### 2.2 Instalar webpack

```powershell
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin babel-loader
npm install --save-dev style-loader css-loader
```

### 2.3 Gerar build

```powershell
npm run build:web
```

Isso criará a pasta `build/` com os arquivos estáticos.

---

## 📺 Passo 3: Build para Samsung Tizen

### 3.1 Criar estrutura Tizen

```
tizen-app/
├── index.html (copiar de build/)
├── css/
├── js/ (copiar bundle.js)
├── config.xml
└── icon.png
```

### 3.2 Criar config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<widget xmlns="http://www.w3.org/ns/widgets" 
        xmlns:tizen="http://tizen.org/ns/widgets" 
        id="http://yourdomain.com/smartiptv" 
        version="1.0.0" 
        viewmodes="maximized">
    <tizen:application id="smartIPTV.main" package="smartIPTV" required_version="6.0"/>
    <content src="index.html"/>
    <feature name="http://tizen.org/feature/screen.size.all"/>
    <icon src="icon.png"/>
    <name>SmartIPTV Clone</name>
    <tizen:privilege name="http://tizen.org/privilege/internet"/>
    <tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
    <tizen:profile name="tv"/>
</widget>
```

### 3.3 Empacotar com Tizen Studio

#### Usando CLI:

```powershell
# Navegar para Tizen Studio CLI
cd "C:\tizen-studio\tools\ide\bin"

# Criar projeto
.\tizen.bat create web-project -n SmartIPTV -t BasicProject

# Copiar arquivos
# Copie os arquivos de build/ para o projeto criado

# Empacotar
.\tizen.bat package -t wgt -s <certificado> -- <caminho-do-projeto>

# Instalar na TV
.\tizen.bat install -n SmartIPTV.wgt -t <IP-da-TV>
```

#### Usando GUI:

1. Abra Tizen Studio
2. File → New → Tizen Project
3. Template → Web Application → Basic
4. Substitua arquivos pelo build
5. Build → Build Package
6. Run → Run As → Tizen Web Application

### 3.4 Testar no emulador

```powershell
# Iniciar emulador
.\emulator-manager.bat

# Selecionar TV emulator e iniciar
```

---

## 📺 Passo 4: Build para LG webOS

### 4.1 Criar estrutura webOS

```
webos-app/
├── index.html (copiar de build/)
├── js/ (copiar bundle.js)
├── appinfo.json
└── icon.png
```

### 4.2 Criar appinfo.json

```json
{
  "id": "com.yourdomain.smartiptv",
  "version": "1.0.0",
  "vendor": "Your Name",
  "type": "web",
  "main": "index.html",
  "title": "SmartIPTV Clone",
  "icon": "icon.png",
  "requiredPermissions": [
    "internet",
    "tv.inputdevice"
  ]
}
```

### 4.3 Empacotar com webOS CLI

```powershell
# Instalar webOS CLI (se não instalado)
npm install -g @webosose/ares-cli

# Empacotar aplicação
ares-package <caminho-do-projeto>

# Configurar dispositivo (TV)
ares-setup-device

# Instalar na TV
ares-install --device <nome-do-dispositivo> com.yourdomain.smartiptv_1.0.0_all.ipk

# Executar
ares-launch --device <nome-do-dispositivo> com.yourdomain.smartiptv
```

### 4.4 Modo desenvolvedor na TV LG

1. Na TV, vá em Settings → General → About
2. Pressione "OK" no número de série 5 vezes
3. Modo desenvolvedor ativado
4. Configure IP da TV e porta (9922)

---

## 🎨 Otimizações para TV

### Navegação por Controle Remoto

Adicione suporte a teclas direcionais:

```javascript
useEffect(() => {
  const handleKeyPress = (event) => {
    switch(event.keyCode) {
      case 37: // Seta esquerda
        // Navegar para esquerda
        break;
      case 38: // Seta cima
        // Navegar para cima
        break;
      case 39: // Seta direita
        // Navegar para direita
        break;
      case 40: // Seta baixo
        // Navegar para baixo
        break;
      case 13: // Enter/OK
        // Selecionar
        break;
      case 27: // Back
        // Voltar
        break;
    }
  };

  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
}, []);
```

### Performance

```javascript
// Lazy loading de imagens
const [imageLoaded, setImageLoaded] = useState(false);

// Virtualização de listas longas
import { FlatList } from 'react-native';

// Debounce para busca
const debouncedSearch = useCallback(
  debounce((text) => searchChannels(text), 300),
  []
);
```

---

## 📦 Checklist Final

### Antes de publicar:

- [ ] Testado em emulador
- [ ] Testado em dispositivo físico
- [ ] Navegação por controle remoto funcional
- [ ] Performance otimizada (60fps)
- [ ] Ícones e assets em alta resolução
- [ ] Certificado de desenvolvedor configurado
- [ ] Metadados completos (descrição, screenshots)
- [ ] Política de privacidade
- [ ] Termos de uso

---

## 🐛 Problemas Comuns

### Build não funciona na TV

- Verificar compatibilidade de APIs
- Testar no emulador primeiro
- Conferir console de erros (inspector remoto)

### Controle remoto não responde

- Implementar listeners de teclado
- Testar com teclado USB na TV
- Verificar privilégios no config.xml/appinfo.json

### Vídeo não reproduz

- Usar codec compatível (H.264)
- Verificar CORS no servidor de streams
- Testar URL de stream separadamente

---

## 📚 Recursos Adicionais

### Samsung Tizen
- [Documentação oficial](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html)
- [Guias e tutoriais](https://developer.samsung.com/smarttv/develop/guides.html)
- [Fórum de desenvolvedores](https://forum.developer.samsung.com/)

### LG webOS
- [Documentação oficial](http://webostv.developer.lge.com/)
- [SDK Download](http://webostv.developer.lge.com/sdk/download/download-sdk/)
- [Fórum de desenvolvedores](http://webostv.developer.lge.com/community/)

---

## ✅ Conclusão

Seguindo este guia, você conseguirá:

1. Adaptar o app React Native para web
2. Gerar builds otimizados
3. Empacotar para Tizen (.wgt)
4. Empacotar para webOS (.ipk)
5. Testar e publicar nas lojas

**Boa sorte com seu aplicativo de IPTV! 🚀📺**
