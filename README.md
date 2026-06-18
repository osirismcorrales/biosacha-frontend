# 🌿 BioSacha — Frontend Móvil

Aplicación móvil para el registro y exploración de fauna autóctona en reservas naturales de Argentina. Desarrollada con **React Native + Expo** como parte de un proyecto académico/profesional.

---

## 📱 Capturas de pantalla

> La app integra pantallas de especies, quizzes, mapa interactivo, expediciones en reservas y colección de cartas.

---

## 🚀 Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Expo SDK 54](https://expo.dev) | Framework base |
| [React Native 0.81](https://reactnative.dev) | Motor de UI |
| [Expo Router 6](https://expo.github.io/router) | Navegación basada en archivos |
| [NativeWind 4](https://www.nativewind.dev) | Estilos con Tailwind CSS |
| [expo-audio](https://docs.expo.dev/versions/latest/sdk/audio/) | Reproducción de sonidos de especies |
| [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) | Carga optimizada de imágenes |
| [expo-speech](https://docs.expo.dev/versions/latest/sdk/speech/) | Narración de fichas de especies |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | Manejo de insets |
| TypeScript | Tipado estático |

---

## 🗂️ Arquitectura

El proyecto sigue una **arquitectura modular por features**:

```
src/
  features/
    species/        # Catálogo de especies + detalle + audio
    quiz/           # Quizzes de identificación
    reserve/        # Reservas, expediciones, código QR
    dex/            # Colección de cartas por reserva
    sighting/       # Registro de avistajes
    profile/        # Perfil de usuario
    home/           # Pantalla principal
  shared/
    components/     # Componentes reutilizables (badges, cards, etc.)
    constants/      # Paleta de colores y tema
app/                # Rutas Expo Router (file-based routing)
  (tabs)/           # Navegación principal con bottom tabs
    species/        # Stack anidado: lista → detalle
    dex/            # Stack anidado: colección → reserva
    map.tsx
    quizzes.tsx
    profile.tsx
  reserve/[id]/     # Ficha, unirse (QR/código), expedición activa
  quiz/[id]/        # Intro + pantalla de juego
  sighting/new.tsx
```

---

## ✨ Funcionalidades principales

- **Catálogo de especies** con fichas detalladas, audio de sonidos y narración por voz
- **Quiz interactivo** de identificación de fauna con sistema de puntos y mascota motivacional
- **Mapa de reservas** con bottom sheet mostrando reserva seleccionada
- **Flujo de expedición**: Ficha de reserva → Escaneo de QR o código manual → Dashboard de expedición activa
- **Colección de cartas** (tipo Pokédex) organizada por reserva
- **Registro de avistajes** con selección de ubicación

---

## 🛠️ Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/biosacha-frontend.git
cd biosacha-frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run start
```

Luego escanear el QR con la app **Expo Go** desde tu celular (Android/iOS).

---

## 📋 Requisitos

- Node.js 18+
- npm 9+
- Expo Go (en el celular) o un emulador Android/iOS

---

## 🗺️ Rutas de navegación

```
/(tabs)/species        → Catálogo de especies
/(tabs)/species/[id]   → Detalle de especie (audio + narración)
/(tabs)/quizzes        → Menú de quizzes
/quiz/[id]             → Intro del quiz
/quiz/[id]/play        → Juego de preguntas
/(tabs)/map            → Mapa de reservas
/reserve/[id]          → Ficha completa de la reserva
/reserve/[id]/join     → Unirse con QR o código
/reserve/[id]/expedition → Expedición activa (EN VIVO)
/(tabs)/dex            → Mi colección de cartas
/(tabs)/dex/[reserveId] → Colección de una reserva
/sighting/new          → Nuevo avistaje
/(tabs)/profile        → Perfil de usuario
```

---

## 👤 Autor

Desarrollado por **[Tu Nombre]** · [LinkedIn](https://linkedin.com) · [GitHub](https://github.com)

Proyecto académico — Universidad Nacional de Tucumán
