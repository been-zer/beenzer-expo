# 🌍 Beenzer dApp

**Location-based Social NFT Platform on Solana**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/alexcolls/beenzer-expo)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.71.8-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-48.0.0-black.svg)](https://expo.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/alexcolls/beenzer-expo/graphs/commit-activity)
[![GitHub issues](https://img.shields.io/github/issues/alexcolls/beenzer-expo)](https://github.com/alexcolls/beenzer-expo/issues)
[![GitHub stars](https://img.shields.io/github/stars/alexcolls/beenzer-expo?style=social)](https://github.com/alexcolls/beenzer-expo/stargazers)

---

## 📚 Table of Contents

- [📱 About](#-about)
- [✨ Key Features](#-key-features)
- [📸 Screenshots](#-screenshots)
- [🎬 Demo](#-demo)
- [🛠️ Tech Stack](#-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [📱 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [📝 Available Scripts](#-available-scripts)
- [🛣️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)
- [👤 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)
- [🔗 Related Projects](#-related-projects)
- [📧 Support](#-support)

---

## 📱 About

**Beenzer** is the ultimate social mobile application for true digital ownership on the Solana blockchain. Share and mint your stories, photos, and videos as location-based NFTs on an interactive map. Monetize your creations through NFT marketplaces and take control of your online legacy.

Beenzer combines Web3 technology with social networking to create a unique location-based experience where every moment becomes an ownable, tradeable digital asset.

---

## ✨ Key Features

### 🔐 Web3 Integration
- **Phantom Wallet Authentication** - Secure login with Phantom mobile wallet
- **Solana Blockchain** - Fast, low-cost NFT minting on Solana
- **True Digital Ownership** - Own your content as NFTs with verifiable on-chain provenance

### 📍 Location-Based Social
- **Drop Beenzers** - Mint location-based NFTs from photos or videos
- **Interactive Map View** - Visualize NFTs on a real-world map
- **Distance-Based Visibility** - Control NFT visibility radius (local to global)
- **City Detection** - Automatic location tagging with city information

### 🎨 Content Creation
- **Photo & Video Capture** - Built-in camera functionality
- **Media NFT Minting** - Convert photos/videos into blockchain NFTs
- **Custom Descriptions** - Add context and stories to your Beenzers
- **Supply Control** - Set edition sizes for your NFT drops

### 👥 Social Features
- **User Profiles** - Customizable profiles with social media links
- **Friends Feed** - See NFTs from people you follow
- **Public Feed** - Discover Beenzers from the community
- **Real-time Messaging** - Direct messaging with Socket.io
- **Notifications** - Stay updated on interactions

### 🎨 Customization
- **Dark/Light Mode** - Toggle between themes with swipe gestures
- **Responsive Design** - Optimized for iOS and Android
- **Native Performance** - Built with React Native for smooth UX

---

## 📸 Screenshots

> **Coming Soon!** Screenshots of the app will be added here.

<details>
<summary>Click to view screenshots</summary>

### Login & Home
<!-- Add screenshots here -->
```
[Login Screen]  [Home Map]  [Dark Mode]
```

### NFT Creation & Feed
<!-- Add screenshots here -->
```
[Camera]  [Post Beenzer]  [Public Feed]
```

### Profile & Social
<!-- Add screenshots here -->
```
[User Profile]  [Messages]  [Friends]
```

**Note:** To add screenshots, place images in `/assets/screenshots/` and update this section.

</details>

---

## 🎬 Demo

### Live App

- **iOS (TestFlight):** _Coming Soon_
- **Android (APK):** _Coming Soon_
- **Web Demo:** _Coming Soon_

### Video Walkthrough

> **Coming Soon!** A video demonstration of the app's features will be added here.

### Try It Yourself

1. Clone the repository
2. Follow the [Installation](#-installation) instructions
3. Run on your device/emulator with `npm start`

---

## 🛠️ Tech Stack

### Frontend Framework
- **React Native** `0.70.5` - Cross-platform mobile development
- **Expo** `47.0.13` - Build and deployment toolchain
- **TypeScript** `4.6.3` - Type-safe development

### State Management
- **Redux Toolkit** `1.9.1` - Global state management
- **Jotai** `1.12.0` - Atomic state management
- **React Redux** `8.0.5` - React bindings for Redux

### Blockchain & Web3
- **Solana Web3.js** `1.35.0` - Solana blockchain integration
- **TweetNaCl** `1.0.3` - Cryptographic signatures
- **Buffer** `6.0.3` - Binary data handling

### Navigation & UI
- **React Navigation** `6.1.1` - Navigation framework
- **React Native Paper** `5.1.2` - Material Design components
- **NativeWind** `2.0.11` - Tailwind CSS for React Native
- **React Native Heroicons** `3.2.0` - Icon library
- **Expo Linear Gradient** `12.0.1` - Gradient components

### Location & Maps
- **React Native Maps** `1.3.2` - Interactive map display
- **Expo Location** `15.0.1` - Geolocation services

### Media Handling
- **Expo Camera** `13.1.0` - Camera access
- **Expo AV** `13.0.2` - Audio/Video playback
- **Expo Media Library** `15.0.0` - Media storage
- **Expo File System** `15.1.1` - File management
- **Expo Image Manipulator** `11.0.0` - Image processing
- **gif.js** `0.2.0` - GIF generation

### Real-time Communication
- **Socket.io Client** `4.5.4` - WebSocket communication
- **dotenv** `16.0.3` - Environment configuration

### Development Tools
- **Babel** `7.12.9` - JavaScript transpiler
- **Tailwind CSS** `3.2.4` - Utility-first CSS framework
- **EAS CLI** `>= 3.6.0` - Expo Application Services

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 14.x
- **npm** >= 6.x or **yarn** >= 1.22.x
- **Expo CLI** - Install globally:
  ```bash
  npm install -g expo-cli
  ```
- **iOS Development** (Mac only):
  - Xcode 12+ with iOS Simulator
  - CocoaPods
- **Android Development**:
  - Android Studio
  - Android SDK
  - Android Emulator or physical device
- **Phantom Wallet** (mobile app) - For Web3 authentication

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/alexcolls/beenzer-expo.git
cd beenzer-expo
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. iOS Setup (Mac only)
```bash
cd ios
pod install
cd ..
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
REACT_APP_SERVER=https://your-backend-server.com

# Solana Configuration
REACT_APP_MINT_COST=0.01

# Google Maps API Key (for iOS)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> **Note:** See `.env.sample` for a complete list of required environment variables.

---

## 📱 Usage

### Development Mode

Start the Expo development server:
```bash
npm start
# or
expo start
```

### Run on iOS
```bash
npm run ios
# or
expo start --ios
```

### Run on Android
```bash
npm run android
# or
expo start --android
```

### Run on Web
```bash
npm run web
# or
expo start --web
```

### EAS Build (Production)

For production builds using Expo Application Services:

```bash
# Development build
eas build --profile development --platform ios

# Preview build
eas build --profile preview --platform android

# Production build
eas build --profile production --platform all
```

---

## 📁 Project Structure

```
beenzer-expo/
├── assets/               # Images, fonts, and static resources
├── components/           # Reusable React components
│   ├── Profile.components/  # Profile-specific components
│   ├── ColorMode.tsx
│   ├── DisplayButton.tsx
│   ├── FriendSearch.tsx
│   └── ...
├── config/              # Configuration files
│   └── index.ts         # App-wide constants
├── screens/             # Screen components (pages)
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── PostBeenzer.tsx
│   ├── Profile.tsx
│   ├── Messages.tsx
│   └── ...
├── services/            # Business logic and external services
│   ├── globals/         # Global state atoms (Jotai)
│   ├── phantom/         # Phantom wallet integration
│   └── socket/          # Socket.io communication
├── @types/              # TypeScript type definitions
├── App.tsx              # Root application component
├── Types.ts             # Shared TypeScript interfaces
├── app.json             # Expo app configuration
├── eas.json             # EAS Build configuration
├── tsconfig.json        # TypeScript configuration
├── babel.config.js      # Babel configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run web` | Run in web browser |

---

## 🛣️ Roadmap

### Version 2.0.0 - Major Refactor (2025)

🔥 **See [REFACTOR.md](REFACTOR.md) for the complete modernization plan!**

#### Highlights

- ⬆️ **Dependency Upgrades**: Expo 54, React Native 0.80, React 19
- 🏛️ **Architecture Refactor**: Improved state management, TypeScript strict mode
- 🧪 **Testing Infrastructure**: Jest, React Native Testing Library, E2E tests
- 🎨 **UI/UX Improvements**: NativeWind v4, accessibility enhancements
- 🔒 **Security Updates**: Latest Solana best practices, improved wallet integration
- 🚀 **New Features**: Offline support, push notifications, enhanced NFT features
- 🔧 **DevOps**: GitHub Actions CI/CD, automated builds

### Current Status

- ✅ Version 1.1.0 - Current stable release
- 🚧 Version 2.0.0 - In planning phase (see [REFACTOR.md](REFACTOR.md))

### Feature Requests

Have an idea? [Open an issue](https://github.com/alexcolls/beenzer-expo/issues/new) with the label `enhancement`.

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m '✨ Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style
- Follow the existing TypeScript and React Native conventions
- Use meaningful commit messages with emojis (see [commit conventions](https://www.conventionalcommits.org/))
- Ensure code is properly formatted before committing
- Add comments for complex logic
- Write tests for new features

### Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/beenzer-expo.git
   cd beenzer-expo
   npm install
   ```

2. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   npm start
   # Test on iOS/Android
   ```

5. **Commit & Push**
   ```bash
   git commit -m "✨ Add amazing feature"
   git push origin feature/your-feature-name
   ```

6. **Open Pull Request**
   - Describe your changes
   - Link related issues
   - Wait for review

### Reporting Bugs

Found a bug? [Open an issue](https://github.com/alexcolls/beenzer-expo/issues/new) with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Device/OS information

---

## 🐛 Troubleshooting

### Common Issues

#### "Cannot connect to Phantom Wallet"

**Solution:**
- Ensure Phantom app is installed on your device
- Check that deep linking is properly configured
- Verify the app scheme in `app.json` matches your configuration

#### "Location permission denied"

**Solution:**
- Go to device Settings > Privacy > Location Services
- Enable location access for Beenzer
- Restart the app

#### "Build fails on iOS"

**Solution:**
```bash
cd ios
pod install --repo-update
cd ..
npm run ios
```

#### "Expo modules not found"

**Solution:**
```bash
npm install
px expo prebuild --clean
npm start
```

#### "TypeScript errors after install"

**Solution:**
```bash
rm -rf node_modules
npm install
npx tsc --noEmit
```

### Still Having Issues?

- Check existing [GitHub Issues](https://github.com/alexcolls/beenzer-expo/issues)
- Join our [Discussions](https://github.com/alexcolls/beenzer-expo/discussions)
- Review the [Expo documentation](https://docs.expo.dev/)
- Contact support (see [Support](#-support) section)

---

## 📄 License

This project is licensed under the **Apache License 2.0**.

```
Copyright 2025 Beenzer dApp Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

See the [LICENSE](LICENSE) file for full license text.

---

## 📚 Changelog

For a detailed history of changes, see [CHANGELOG.md](CHANGELOG.md).

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=alexcolls/beenzer-expo&type=Date)](https://star-history.com/#alexcolls/beenzer-expo&Date)

⭐ **Star this repo if you find it helpful!** It helps us grow the community.

---

## 👤 Author

**GitHub:** [@alexcolls](https://github.com/alexcolls)  
**Repository:** [beenzer-expo](https://github.com/alexcolls/beenzer-expo)

---

## 🙏 Acknowledgments

- **[Solana](https://solana.com/)** - High-performance blockchain platform
- **[Phantom Wallet](https://phantom.app/)** - Solana wallet for Web3 authentication
- **[Expo](https://expo.dev/)** - React Native development platform
- **[React Navigation](https://reactnavigation.org/)** - Routing and navigation
- **[Socket.io](https://socket.io/)** - Real-time bidirectional communication
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps)** - Map integration
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[Jotai](https://jotai.org/)** - Primitive and flexible state management

---

## 🔗 Related Projects

- **[beenzer-server](https://github.com/alexcolls/beenzer-server)** - Backend server for Beenzer dApp
- **[beenzer-dao](https://github.com/alexcolls/beenzer-dao)** - DAO governance for Beenzer

---

## 📧 Support

For questions, issues, or feature requests, please [open an issue](https://github.com/alexcolls/beenzer-expo/issues) on GitHub.

---

<div align="center">

**Made with ❤️ for the Solana ecosystem**

⭐ Star this repo if you find it helpful!

</div>
