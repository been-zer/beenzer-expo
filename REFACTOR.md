# 🔧 Beenzer dApp v2.0.0 - Refactor & Modernization Plan

**Status:** 🚧 Planning Phase  
**Target Release:** 2025 Q2  
**Current Version:** 1.1.0  
**Next Version:** 2.0.0

---

## 📋 Table of Contents

- [Executive Summary](#executive-summary)
- [Critical Dependency Updates](#-critical-dependency-updates)
- [Code Architecture Improvements](#-code-architecture-improvements)
- [Testing & Quality Infrastructure](#-testing--quality-infrastructure)
- [UI/UX & Performance](#-uiux--performance)
- [Security Enhancements](#-security-enhancements)
- [New Features](#-new-features)
- [DevOps & CI/CD](#-devops--cicd)
- [Known Issues & Bug Fixes](#-known-issues--bug-fixes)
- [Migration Guide](#-migration-guide)
- [Timeline & Priorities](#-timeline--priorities)

---

## Executive Summary

Beenzer dApp is a 3-year-old React Native/Expo project that requires comprehensive modernization. This refactor plan addresses technical debt, updates outdated dependencies (6+ major versions behind), improves code architecture, and adds modern development practices.

### Key Goals

1. **Update all dependencies** to latest stable versions
2. **Improve code quality** with testing, linting, and TypeScript strict mode
3. **Enhance performance** with optimizations and better patterns
4. **Strengthen security** with latest Solana and wallet best practices
5. **Add new features** to improve user experience
6. **Implement CI/CD** for automated testing and deployment

---

## ⬆️ Critical Dependency Updates

### Core Framework Updates

#### 1. Expo SDK: 48 → 54
- **Current:** 48.0.0
- **Target:** 54.0.0
- **Breaking Changes:** 6 major versions
- **Priority:** 🔴 CRITICAL

**Migration Steps:**
```bash
# Upgrade Expo CLI
npm install -g expo-cli@latest

# Update project
expo upgrade 54

# Review breaking changes
# https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
```

**Key Breaking Changes:**
- New autolinking system (Expo Modules API v2)
- Updated asset system
- Changed splash screen configuration
- New app.json/app.config.js schema
- Updated EAS Build configuration

**Files to Update:**
- `app.json` - Update schema and configuration
- `babel.config.js` - Update Expo preset
- `package.json` - Update all Expo dependencies
- `eas.json` - Update build configuration

---

#### 2. React Native: 0.71.8 → 0.80.2
- **Current:** 0.71.8
- **Target:** 0.80.2 (or latest compatible with Expo 54)
- **Breaking Changes:** 9 minor versions
- **Priority:** 🔴 CRITICAL

**Key Changes:**
- New Architecture (Fabric + TurboModules) available
- Updated JavaScript engine (Hermes improvements)
- Improved performance and startup time
- Updated Android/iOS native dependencies

**Migration Notes:**
- Test all native modules for compatibility
- Update iOS Podfile and Android gradle files
- Review deprecated APIs (PropTypes, etc.)

---

#### 3. React: 18.2.0 → 19.2.0
- **Current:** 18.2.0
- **Target:** 19.2.0
- **Breaking Changes:** 1 major version
- **Priority:** 🟡 HIGH

**React 19 New Features:**
- Server Components (not applicable for mobile)
- Enhanced Suspense
- Automatic batching improvements
- useOptimistic, useFormState, useFormStatus hooks

**Action Items:**
- Update `react` and `react-dom` together
- Test all component rendering behavior
- Review and update custom hooks
- Update TypeScript types

---

#### 4. React Navigation: 6.x → 7.x
- **Current:** 
  - `@react-navigation/native`: 6.1.1
  - `@react-navigation/native-stack`: 6.9.7
- **Target:** 7.x latest
- **Breaking Changes:** 1 major version
- **Priority:** 🟡 HIGH

**Migration Steps:**
```bash
npm install @react-navigation/native@^7.0.0
npm install @react-navigation/native-stack@^7.0.0
```

**Breaking Changes:**
- Updated screen configuration API
- Changed header options structure
- New gesture handling system
- Updated deep linking configuration

**Files to Update:**
- `App.tsx` - Update navigation configuration
- All screen files - Update navigation props types

---

### Blockchain & Web3 Updates

#### 5. @solana/web3.js: 1.35.0 → 1.98.4
- **Current:** 1.35.0
- **Target:** 1.98.4
- **Changes:** 63 minor versions
- **Priority:** 🔴 CRITICAL

**Major Updates:**
- Versioned transactions support
- Updated RPC methods
- Improved connection handling
- New token program interfaces
- Enhanced error handling

**Files to Review:**
- `services/phantom/login.ts`
- `services/phantom/sign.ts`
- `services/phantom/disconnect.ts`
- All NFT minting and transaction code

**Migration Checklist:**
```typescript
// Old (v1.35)
import { Connection, PublicKey } from '@solana/web3.js';

// New (v1.98) - API mostly compatible but check:
// - Transaction version handling
// - RPC endpoint changes
// - New error types
```

---

### UI & Styling Updates

#### 6. NativeWind: 2.0.11 → 4.2.1
- **Current:** 2.0.11
- **Target:** 4.2.1
- **Breaking Changes:** 2 major versions
- **Priority:** 🟡 HIGH

**MASSIVE REWRITE - This will require significant effort!**

**NativeWind v4 Changes:**
- Complete rewrite with new architecture
- Better Tailwind v3 compatibility
- Improved performance
- New setup process
- Different configuration

**Migration Steps:**
```bash
# Uninstall old version
npm uninstall nativewind

# Install v4
npm install nativewind@^4.0.0
npm install --save-dev tailwindcss@^3.4.0

# Update configuration
```

**New Configuration (tailwind.config.js):**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Files Requiring Updates:**
- ALL component files using `className`
- `tailwind.config.js` - Complete rewrite
- `babel.config.js` - Update plugin configuration
- `app.json` - Update plugins section

**Affected Files Count:** ~35 files (all screens + components)

---

### State Management Updates

#### 7. Jotai: 1.12.0 → 2.15.1
- **Current:** 1.12.0
- **Target:** 2.15.1
- **Priority:** 🟢 MEDIUM

**Changes:**
- Better TypeScript support
- New atom utilities
- Improved devtools
- Performance improvements

#### 8. Redux Toolkit: 1.9.1 → 2.10.1
- **Current:** 1.9.1
- **Target:** 2.10.1 (or consider removing)
- **Priority:** 🟢 MEDIUM

**Note:** Currently using BOTH Redux and Jotai - consider consolidating to just Jotai.

---

### Expo Modules Updates

All Expo modules are 3-6 years outdated and need updates:

| Module | Current | Target | Priority |
|--------|---------|--------|----------|
| expo-av | 13.2.1 | 16.0.7 | 🟡 HIGH |
| expo-camera | 13.2.1 | 17.0.9 | 🔴 CRITICAL |
| expo-location | 15.1.1 | 19.0.7 | 🔴 CRITICAL |
| expo-file-system | 15.2.2 | 19.0.17 | 🟡 HIGH |
| expo-image-manipulator | 11.1.1 | 14.0.7 | 🟡 HIGH |
| expo-media-library | 15.2.3 | 18.2.0 | 🟡 HIGH |
| expo-secure-store | 12.1.1 | 15.0.7 | 🔴 CRITICAL |
| expo-linking | 4.0.1 | 8.0.8 | 🔴 CRITICAL |
| expo-status-bar | 1.4.4 | 3.0.8 | 🟢 MEDIUM |

**Migration Strategy:**
1. Update all Expo modules together after Expo SDK upgrade
2. Test each module individually
3. Update TypeScript types
4. Review permission handling changes

---

### Other Notable Updates

- **react-native-maps:** 1.3.2 → 1.26.0
- **react-native-reanimated:** 2.12.0 → 4.1.5 (MAJOR - new API)
- **react-native-svg:** 13.4.0 → 15.14.0
- **socket.io-client:** 4.5.4 → 4.8.1
- **dotenv:** 16.0.3 → 17.2.3

---

## 🏛️ Code Architecture Improvements

### 1. State Management Consolidation

**Current Problem:**
- Using BOTH Redux Toolkit AND Jotai
- Confusing state management strategy
- Redux appears mostly unused
- All state is in Jotai atoms

**Solution:**
```
Priority: 🔴 CRITICAL
Effort: 2-3 days
```

**Action Plan:**
1. **Audit Redux usage** - Check if Redux is actually being used
2. **Remove Redux** if unused:
   ```bash
   npm uninstall redux react-redux @reduxjs/toolkit
   ```
3. **Standardize on Jotai** - Already being used extensively
4. **Create organized atom structure**:
   ```
   services/
   └── state/
       ├── atoms/
       │   ├── auth.atoms.ts
       │   ├── user.atoms.ts
       │   ├── nft.atoms.ts
       │   ├── ui.atoms.ts
       │   └── index.ts
       └── hooks/
           ├── useAuth.ts
           ├── useUser.ts
           └── useNFT.ts
   ```

**Example Refactor:**
```typescript
// Before (services/globals/index.ts)
export const atomUserNFTs = atom<UserNFT[]>([]);
export const atomProfile = atom<IProfile>({} as IProfile);

// After (services/state/atoms/user.atoms.ts)
import { atom } from 'jotai';
import { IProfile, UserNFT } from '@/types';

export const userProfileAtom = atom<IProfile | null>(null);
export const userNFTsAtom = atom<UserNFT[]>([]);
export const userLocationAtom = atom<ILocation | null>(null);

// services/state/hooks/useUser.ts
export function useUser() {
  const [profile, setProfile] = useAtom(userProfileAtom);
  const [nfts, setNFTs] = useAtom(userNFTsAtom);
  
  const updateProfile = useCallback((data: Partial<IProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...data });
    }
  }, [profile]);

  return {
    profile,
    nfts,
    updateProfile,
    setNFTs,
  };
}
```

---

### 2. TypeScript Strict Mode

**Current Problem:**
- `strict: true` in tsconfig but not enforced
- Many `any` types throughout codebase
- Missing proper type definitions
- Loose type checking

**Solution:**
```
Priority: 🟡 HIGH
Effort: 4-5 days
```

**Action Plan:**
1. **Enable strict TypeScript checking:**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true,
       "strictFunctionTypes": true,
       "strictPropertyInitialization": true,
       "noImplicitThis": true,
       "alwaysStrict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noImplicitReturns": true,
       "noFallthroughCasesInSwitch": true,
     }
   }
   ```

2. **Fix type errors** systematically by file
3. **Remove all `any` types**
4. **Add proper type definitions**

**Examples of Issues to Fix:**
```typescript
// Bad (current code - screens/Home.tsx)
const getLoc: any = await getUserLocation();

// Good
const getLoc: ILocation | null = await getUserLocation();

// Bad (services/globals/index.ts)
creator?: any,

// Good
creator?: PublicKey | string,
```

---

### 3. Project Structure Refactor

**Current Structure Issues:**
- No `/hooks` directory (custom hooks mixed in components)
- No `/utils` or `/lib` directory
- Large screen components (Home.tsx is 156 lines)
- Business logic mixed with UI

**Proposed New Structure:**
```
beenzer-expo/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── profile/         # Profile-specific
│   │   └── nft/             # NFT-specific
│   ├── screens/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── profile/
│   │   └── messages/
│   ├── hooks/               # NEW - Custom hooks
│   │   ├── usePhantom.ts
│   │   ├── useLocation.ts
│   │   ├── useNFT.ts
│   │   └── useSocket.ts
│   ├── lib/                 # NEW - Utilities
│   │   ├── crypto.ts
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   ├── services/
│   │   ├── api/             # API calls
│   │   ├── phantom/         # Phantom wallet
│   │   ├── socket/          # Socket.io
│   │   └── state/           # State management
│   ├── types/               # TypeScript types
│   │   ├── nft.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   ├── navigation/          # NEW - Navigation config
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   └── config/              # Configuration
│       ├── env.ts           # Environment variables
│       └── theme.ts         # Theme constants
├── assets/
├── App.tsx
└── package.json
```

**Migration Priority:**
```
Priority: 🟢 MEDIUM
Effort: 3-4 days
```

**Migration Steps:**
1. Create new directories
2. Move files gradually (one directory at a time)
3. Update imports using search & replace
4. Test after each major move

---

### 4. Environment Configuration Migration

**Current Problem:**
- Hardcoded config in `config/index.ts`:
  ```typescript
  export const REACT_APP_SERVER = "https://beenzer-server-552200.onrender.com";
  export const REACT_APP_MINT_COST = 0.01;
  ```
- Not using `.env` properly
- Hardcoded API keys and endpoints

**Solution:**
```
Priority: 🟡 HIGH
Effort: 1 day
```

**Action Plan:**
1. **Update config/env.ts:**
   ```typescript
   import Constants from 'expo-constants';
   
   export const ENV = {
     SERVER_URL: process.env.REACT_APP_SERVER || Constants.expoConfig?.extra?.serverUrl,
     MINT_COST: parseFloat(process.env.REACT_APP_MINT_COST || '0.01'),
     GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_API_KEY,
     SOLANA_RPC: process.env.SOLANA_RPC_URL,
   };
   ```

2. **Update app.config.js** (replace app.json):
   ```javascript
   import 'dotenv/config';
   
   export default {
     expo: {
       name: "Beenzer dApp",
       // ... other config
       extra: {
         serverUrl: process.env.REACT_APP_SERVER,
         eas: {
           projectId: "b37474c5-8142-444c-959c-d0e86ca23b53"
         }
       }
     }
   };
   ```

3. **Delete config/index.ts**
4. **Update all imports** from `config` to use new `ENV` object

---

### 5. Security: Remove Client-Side SQL Injection Regex

**Current Problem:**
```typescript
// services/globals/index.ts (line 26)
export const atomRegex = atom<RegExp>(new RegExp(/... huge SQL injection regex .../i));
```

**Why This Is Wrong:**
- Client-side validation is NOT security
- SQL injection should be prevented on the BACKEND
- This regex is ineffective and gives false security
- Increases bundle size unnecessarily

**Solution:**
```
Priority: 🔴 CRITICAL
Effort: 1 hour
```

**Action Plan:**
1. **Remove the regex atom** from client
2. **Add server-side validation** in beenzer-server
3. **Use parameterized queries** on backend
4. **Add input sanitization** on backend

**Remove this:**
```typescript
// DELETE THIS
export const atomRegex = atom<RegExp>(new RegExp(/... /i));
```

---

### 6. Extract Business Logic from UI Components

**Current Problem:**
- Large components mixing UI and logic (Home.tsx, Profile.tsx)
- API calls directly in components
- Difficult to test
- Hard to reuse logic

**Solution:**
```
Priority: 🟢 MEDIUM
Effort: 5-6 days
```

**Example Refactor (Home.tsx):**

**Before:**
```typescript
// screens/Home.tsx (current)
const Home = () => {
  const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
  const [SOCKET] = useAtom(atomSOCKET);
  
  const getInfoNft = async () => {
    try {
      const profileNFTs = await socketUserNFTs(SOCKET, phantomWalletPublicKey.toString());
      setUserNFTs(profileNFTs.reverse());
    } catch (e) {
      console.error(e);
    }
  }
  
  // ... 150 more lines
}
```

**After:**
```typescript
// hooks/useUserNFTs.ts (NEW)
export function useUserNFTs() {
  const socket = useSocket();
  const [nfts, setNFTs] = useAtom(userNFTsAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchNFTs = useCallback(async (publicKey: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await socketUserNFTs(socket, publicKey);
      setNFTs(data.reverse());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [socket]);
  
  return { nfts, loading, error, fetchNFTs };
}

// screens/Home.tsx (refactored)
const Home = () => {
  const { nfts, loading, fetchNFTs } = useUserNFTs();
  const { location, refreshLocation } = useLocation();
  
  // ... much cleaner UI code
}
```

---

## 🧪 Testing & Quality Infrastructure

### 1. Testing Framework Setup

**Current State:**
- ❌ No tests
- ❌ No testing framework
- ❌ No test coverage

**Target State:**
- ✅ Jest configured
- ✅ React Native Testing Library
- ✅ 60%+ code coverage
- ✅ CI/CD integration

```
Priority: 🔴 CRITICAL
Effort: 3-4 days
```

**Installation:**
```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
npm install --save-dev @types/jest
```

**Configuration:**

**jest.config.js:**
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|@unimodules|jotai)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 50,
      functions: 60,
      lines: 60,
    },
  },
};
```

**jest-setup.js:**
```javascript
import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo-secure-store');
jest.mock('expo-location');
jest.mock('expo-camera');
jest.mock('expo-linking');

// Mock navigation
jest.mock('@react-navigation/native');
```

**Update package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

### 2. Example Tests

**services/__tests__/phantom.test.ts:**
```typescript
import { connect } from '../phantom/login';
import nacl from 'tweetnacl';
import * as Linking from 'expo-linking';

jest.mock('expo-linking');

describe('Phantom Wallet Login', () => {
  it('should generate connection URL with correct parameters', () => {
    const mockKeyPair = nacl.box.keyPair();
    const mockOpenURL = jest.fn();
    (Linking.openURL as jest.Mock).mockImplementation(mockOpenURL);

    connect(mockKeyPair);

    expect(mockOpenURL).toHaveBeenCalled();
    const url = mockOpenURL.mock.calls[0][0];
    expect(url).toContain('phantom://');
    expect(url).toContain('connect');
  });
});
```

**hooks/__tests__/useUserNFTs.test.ts:**
```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useUserNFTs } from '../useUserNFTs';

describe('useUserNFTs', () => {
  it('should fetch user NFTs', async () => {
    const { result } = renderHook(() => useUserNFTs());

    expect(result.current.loading).toBe(false);
    expect(result.current.nfts).toEqual([]);

    await act(async () => {
      await result.current.fetchNFTs('mock-pubkey');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
```

---

### 3. ESLint Configuration

**Install:**
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-plugin-react eslint-plugin-react-native eslint-plugin-react-hooks
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

**.eslintrc.js:**
```javascript
module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

---

### 4. Prettier Configuration

**.prettierrc.js:**
```javascript
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  singleQuote: true,
  semi: true,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
};
```

**Update package.json:**
```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\""
  }
}
```

---

### 5. Husky & lint-staged

**Install:**
```bash
npm install --save-dev husky lint-staged
npx husky install
```

**Configure:**

**.husky/pre-commit:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**package.json:**
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 🎨 UI/UX & Performance

### 1. NativeWind v4 Migration

**Covered in [Dependency Updates](#6-nativewind-2011--421) section above.**

```
Priority: 🟡 HIGH
Effort: 6-8 days (affects 35+ files)
```

---

### 2. Accessibility Improvements

**Current State:**
- ❌ No accessibility labels
- ❌ No screen reader support
- ⚠️ Inconsistent color contrast

**Target Improvements:**
```
Priority: 🟢 MEDIUM
Effort: 2-3 days
```

**Action Items:**

1. **Add accessibility labels:**
```typescript
// Before
<TouchableOpacity onPress={handleLogin}>
  <Text>Login with Phantom</Text>
</TouchableOpacity>

// After
<TouchableOpacity 
  onPress={handleLogin}
  accessible={true}
  accessibilityLabel="Login with Phantom Wallet"
  accessibilityRole="button"
  accessibilityHint="Opens Phantom app for secure authentication"
>
  <Text>Login with Phantom</Text>
</TouchableOpacity>
```

2. **Improve color contrast:**
```typescript
// Check all text colors against backgrounds
// Aim for WCAG AA compliance (4.5:1 ratio)
// Use tools: https://webaim.org/resources/contrastchecker/
```

3. **Add semantic HTML elements:**
```typescript
// Use proper heading hierarchy
accessibilityRole="header"
accessibilityLevel={1} // h1
```

---

### 3. Performance Optimizations

#### A. React.memo for Expensive Components

**Example:**
```typescript
// Before
const FeedsItem = ({ item, onPress }: Props) => {
  // ... render logic
}

// After
import React, { memo } from 'react';

const FeedsItem = memo(({ item, onPress }: Props) => {
  // ... render logic
}, (prevProps, nextProps) => {
  return prevProps.item._id === nextProps.item._id;
});
```

**Components to Memoize:**
- `FeedsItem` (rendered in long lists)
- `ProfileCollection` (NFT grid items)
- `DisplayButton`
- All list item components

---

#### B. Map Clustering

**Current Problem:**
- Rendering all NFT markers at once
- Poor performance with many NFTs
- Map becomes cluttered

**Solution:**
```bash
npm install react-native-maps-clustering
```

**Implementation:**
```typescript
import MapView, { Marker } from 'react-native-maps';
import Clustering from 'react-native-maps-clustering';

<Clustering
  ref={mapRef}
  clusterColor="#10b981" // green
  clusterTextColor="#fff"
  clusteringEnabled={true}
  radius={80}
  extent={512}
  minZoom={0}
  maxZoom={20}
>
  {feedItems.map((item) => (
    <Marker
      key={item._id_}
      coordinate={{
        latitude: item._latitude,
        longitude: item._longitude,
      }}
    />
  ))}
</Clustering>
```

---

#### C. expo-image Migration

**Replace Image component with expo-image:**

```bash
npm install expo-image
```

**Benefits:**
- Better caching
- Automatic placeholder
- Native performance
- WebP support

**Example:**
```typescript
// Before
import { Image } from 'react-native';

<Image
  source={{ uri: profile._pfp }}
  style={{ width: 100, height: 100 }}
/>

// After
import { Image } from 'expo-image';

<Image
  source={{ uri: profile._pfp }}
  placeholder={blurhash}
  contentFit="cover"
  transition={200}
  style={{ width: 100, height: 100 }}
  cachePolicy="memory-disk"
/>
```

---

#### D. Lazy Loading Screens

**Implementation:**
```typescript
// App.tsx
import React, { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Lazy load heavy screens
const PostBeenzer = lazy(() => import('./screens/PostBeenzer'));
const Profile = lazy(() => import('./screens/Profile'));
const Messages = lazy(() => import('./screens/Messages'));

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

// Use in navigator
<Stack.Screen name="PostBeenzer">
  {(props) => (
    <Suspense fallback={<LoadingScreen />}>
      <PostBeenzer {...props} />
    </Suspense>
  )}
</Stack.Screen>
```

---

## 🔒 Security Enhancements

### 1. Phantom Wallet Integration Review

**Current Implementation Review:**
- ✅ Using deep linking correctly
- ⚠️ Key storage needs review
- ⚠️ Session management needs improvement
- ❌ No timeout/expiry handling

**Improvements:**
```
Priority: 🟡 HIGH
Effort: 2-3 days
```

**Action Items:**

1. **Improve Key Storage:**
```typescript
// services/phantom/keyStorage.ts (NEW)
import * as SecureStore from 'expo-secure-store';

const KEYS = {
  DAPP_KEYPAIR: 'dapp_keypair',
  SHARED_SECRET: 'shared_secret',
  SESSION_TOKEN: 'session_token',
};

export async function storeDappKeyPair(keyPair: nacl.BoxKeyPair) {
  await SecureStore.setItemAsync(
    KEYS.DAPP_KEYPAIR,
    JSON.stringify({
      publicKey: Array.from(keyPair.publicKey),
      secretKey: Array.from(keyPair.secretKey),
    })
  );
}

export async function getDappKeyPair(): Promise<nacl.BoxKeyPair | null> {
  const stored = await SecureStore.getItemAsync(KEYS.DAPP_KEYPAIR);
  if (!stored) return null;
  
  const { publicKey, secretKey } = JSON.parse(stored);
  return {
    publicKey: Uint8Array.from(publicKey),
    secretKey: Uint8Array.from(secretKey),
  };
}
```

2. **Add Session Timeout:**
```typescript
// services/auth/session.ts (NEW)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function useSessionTimeout() {
  const [isLogin, setIsLogin] = useAtom(atomIsLogin);
  const lastActivity = useRef(Date.now());
  
  useEffect(() => {
    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity.current > SESSION_TIMEOUT) {
        setIsLogin(false);
        // Logout user
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(checkTimeout);
  }, []);
  
  const updateActivity = () => {
    lastActivity.current = Date.now();
  };
  
  return { updateActivity };
}
```

---

### 2. Update to Latest Solana Best Practices

**Action Items:**

1. **Use Versioned Transactions:**
```typescript
import { VersionedTransaction } from '@solana/web3.js';

// Update transaction handling to support v0 transactions
```

2. **Improve RPC Error Handling:**
```typescript
// services/solana/rpc.ts (NEW)
import { Connection } from '@solana/web3.js';

const RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export async function retryRPC<T>(
  fn: () => Promise<T>,
  retries = RETRY_COUNT
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryRPC(fn, retries - 1);
    }
    throw error;
  }
}
```

---

### 3. API Security Improvements

**Current Issues:**
- Hardcoded API endpoint
- No request signing
- No rate limiting awareness

**Improvements:**

1. **Add Request Signing:**
```typescript
// lib/api.ts (NEW)
import { sign } from 'tweetnacl';
import bs58 from 'bs58';

export function signRequest(
  payload: any,
  secretKey: Uint8Array
): string {
  const message = JSON.stringify(payload);
  const messageBytes = new TextEncoder().encode(message);
  const signature = sign.detached(messageBytes, secretKey);
  return bs58.encode(signature);
}

export async function secureApiCall(
  endpoint: string,
  data: any,
  keypair: nacl.BoxKeyPair
) {
  const signature = signRequest(data, keypair.secretKey);
  
  return fetch(`${ENV.SERVER_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': signature,
      'X-PublicKey': bs58.encode(keypair.publicKey),
    },
    body: JSON.stringify(data),
  });
}
```

---

## 🚀 New Features

### 1. Offline Support

**Description:** Cache NFTs and user data for offline viewing

```
Priority: 🟢 MEDIUM
Effort: 3-4 days
```

**Implementation:**
```bash
npm install @react-native-async-storage/async-storage
```

**Example:**
```typescript
// services/cache/nftCache.ts (NEW)
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  USER_NFTS: 'cache_user_nfts',
  MAP_NFTS: 'cache_map_nfts',
};

export async function cacheNFTs(key: string, nfts: INFT[]) {
  await AsyncStorage.setItem(key, JSON.stringify({
    data: nfts,
    timestamp: Date.now(),
  }));
}

export async function getCachedNFTs(key: string): Promise<INFT[] | null> {
  const cached = await AsyncStorage.getItem(key);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24h
  
  return isExpired ? null : data;
}
```

---

### 2. Push Notifications

**Description:** Notify users of new followers, messages, NFT interactions

```
Priority: 🟡 HIGH
Effort: 4-5 days
```

**Installation:**
```bash
expo install expo-notifications
expo install expo-device
```

**Implementation:**
```typescript
// services/notifications/setup.ts (NEW)
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

**Notification Types:**
- New follower
- New message
- Someone viewed your NFT
- NFT sold (if marketplace integrated)

---

### 3. Enhanced NFT Features

#### A. Comments on Beenzers
```
Priority: 🟢 MEDIUM
Effort: 3-4 days
```

**Schema:**
```typescript
interface IComment {
  _id: string;
  _nft_id: string;
  _author: string; // publicKey
  _comment: string;
  _timestamp: number;
  _likes: number;
}
```

#### B. Reactions/Likes
```
Priority: 🟢 MEDIUM
Effort: 2-3 days
```

**Implementation:**
```typescript
// Add to INFT interface
_likes: number;
_liked_by: string[]; // Array of publicKeys
```

#### C. NFT Collections
```
Priority: 🟢 LOW
Effort: 5-6 days
```

**Feature:** Group related NFTs into collections (e.g., "Summer 2023", "Paris Trip")

---

### 4. Analytics & Crash Reporting

**Install Sentry:**
```bash
npm install @sentry/react-native
npx sentry-wizard -i reactNative -p ios android
```

**Configuration:**
```typescript
// App.tsx
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 1.0,
});

export default Sentry.wrap(App);
```

---

## 🔧 DevOps & CI/CD

### 1. GitHub Actions CI/CD Pipeline

**Create .github/workflows/ci.yml:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format -- --check

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  typecheck:
    name: TypeScript Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit

  build-preview:
    name: EAS Build (Preview)
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    needs: [lint, test, typecheck]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform ios --profile preview --non-interactive

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: [lint, test, typecheck]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform all --profile production --auto-submit
```

---

### 2. EAS Update Configuration

**Update eas.json:**
```json
{
  "cli": {
    "version": ">= 5.0.0",
    "promptToConfigurePushNotifications": false
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "env": {
        "APP_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk"
      },
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "app-bundle"
      },
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "beenzer.app@gmail.com",
        "ascAppId": "1673144711",
        "appleTeamId": "SP66HL25RH"
      },
      "android": {
        "serviceAccountKeyPath": "./android-service-account.json",
        "track": "production"
      }
    }
  }
}
```

---

## 🐛 Known Issues & Bug Fixes

### High Priority Fixes

#### 1. Remove "remove" Package
```
Priority: 🔴 CRITICAL
Effort: 5 minutes
```

**Current:** Package "remove" (v0.1.5) in dependencies - questionable/unused
**Action:**
```bash
npm uninstall remove
# Check if anything breaks - likely unused
```

---

#### 2. Fix Commented Feed Navigation
```
Priority: 🟢 MEDIUM
Effort: 30 minutes
```

**Location:** App.tsx line 140-143
```typescript
// Currently commented out:
{/* <Stack.Screen name="Feed" component={Feed} options={{
  headerShown: false,
  animation: 'none',
}} /> */}
```

**Decision Needed:**
- Remove if truly unused
- Or uncomment and integrate properly

---

#### 3. Clean Up Unused Imports
```
Priority: 🟢 LOW
Effort: 1-2 hours
```

**Example (screens/Home.tsx line 20):**
```typescript
import { } from "@react-navigation/native";  // Empty import
```

**Solution:** Run ESLint with auto-fix after setup

---

#### 4. Fix TypeScript Strict Mode Errors
```
Priority: 🟡 HIGH
Effort: 4-5 days
```

**Covered in [Code Architecture](#2-typescript-strict-mode) section**

---

### Platform-Specific Updates

#### iOS: Update for iOS 18 Compatibility
- Update CocoaPods
- Test on iOS 18 simulator
- Review privacy manifest requirements
- Update Xcode project settings

#### Android: Update for Android 15 Compatibility
- Update Gradle version
- Update Android SDK to 34
- Test on Android 15 emulator
- Review new permission requirements

---

## 📖 Migration Guide

### Step-by-Step Migration Plan

#### Phase 1: Preparation (Week 1)
1. ✅ Create feature branch: `refactor/v2`
2. ✅ Backup current production build
3. ✅ Set up new testing infrastructure
4. ✅ Install ESLint, Prettier, Husky

#### Phase 2: Dependencies (Week 2-3)
1. Update Expo SDK 48 → 54
2. Update React Native 0.71 → 0.80
3. Update all Expo modules
4. Update React Navigation 6 → 7
5. Test app thoroughly after each update

#### Phase 3: NativeWind Migration (Week 4)
1. Update NativeWind 2 → 4
2. Update all component styles
3. Test all screens
4. Fix any styling issues

#### Phase 4: Architecture Refactor (Week 5-6)
1. Consolidate state management (remove Redux)
2. Enable TypeScript strict mode
3. Refactor project structure
4. Extract hooks and utilities
5. Migrate environment config

#### Phase 5: Testing & Quality (Week 7)
1. Write unit tests (60% coverage target)
2. Add integration tests
3. Set up CI/CD pipeline
4. Fix all ESLint errors

#### Phase 6: Features & Polish (Week 8-9)
1. Add offline support
2. Implement push notifications
3. Performance optimizations
4. Accessibility improvements

#### Phase 7: Testing & Release (Week 10)
1. Comprehensive QA testing
2. Beta testing with users
3. Fix critical bugs
4. Release v2.0.0

---

## ⏰ Timeline & Priorities

### Priority Matrix

| Task | Priority | Effort | Impact | Start |
|------|----------|--------|--------|-------|
| Update Expo SDK | 🔴 CRITICAL | High | High | Week 2 |
| Update React Native | 🔴 CRITICAL | High | High | Week 2 |
| Update @solana/web3.js | 🔴 CRITICAL | Medium | High | Week 2 |
| Remove SQL injection regex | 🔴 CRITICAL | Low | High | Week 5 |
| NativeWind v4 migration | 🟡 HIGH | High | Medium | Week 4 |
| TypeScript strict mode | 🟡 HIGH | High | High | Week 5 |
| Testing infrastructure | 🟡 HIGH | Medium | High | Week 1 |
| State management refactor | 🟡 HIGH | Medium | High | Week 5 |
| Environment config | 🟡 HIGH | Low | Medium | Week 5 |
| CI/CD pipeline | 🟡 HIGH | Medium | High | Week 7 |
| Code architecture refactor | 🟢 MEDIUM | High | Medium | Week 5-6 |
| Offline support | 🟢 MEDIUM | Medium | Medium | Week 8 |
| Push notifications | 🟢 MEDIUM | Medium | High | Week 8 |
| Accessibility | 🟢 MEDIUM | Medium | Medium | Week 8 |
| Performance optimization | 🟢 MEDIUM | Medium | High | Week 9 |

---

## 📊 Success Metrics

### Technical Metrics
- ✅ All dependencies updated to latest stable versions
- ✅ 60%+ test coverage
- ✅ Zero TypeScript errors in strict mode
- ✅ Zero ESLint errors
- ✅ <3s app startup time
- ✅ Automated CI/CD pipeline passing

### User Experience Metrics
- ✅ Improved app performance (60fps)
- ✅ Better accessibility score
- ✅ Offline functionality working
- ✅ Push notifications active
- ✅ No critical bugs in production

---

## 🤝 Contributing to the Refactor

### How to Help

1. **Pick a task** from the priority matrix
2. **Create an issue** on GitHub
3. **Branch naming:** `refactor/task-name`
4. **Commit with emojis:** See [CHANGELOG.md](CHANGELOG.md) for emoji guide
5. **Open PR** with clear description
6. **Link to this REFACTOR.md** for context

### Communication

- **GitHub Issues:** Track all refactor tasks
- **GitHub Discussions:** Architecture decisions
- **PR Reviews:** All changes require review

---

## 📚 Resources

### Documentation
- [Expo SDK 54 Docs](https://docs.expo.dev/)
- [React Native 0.80 Docs](https://reactnative.dev/)
- [React 19 Docs](https://react.dev/)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [NativeWind v4 Docs](https://www.nativewind.dev/)

### Migration Guides
- [Expo Upgrade Guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
- [NativeWind v4 Migration](https://www.nativewind.dev/v4/overview/migration)

### Tools
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- [depcheck](https://github.com/depcheck/depcheck)
- [bundlephobia](https://bundlephobia.com/)

---

## ✅ Conclusion

This refactor plan transforms Beenzer from a 3-year-old project into a modern, maintainable, and scalable React Native application. The plan is ambitious but achievable with proper planning and execution.

**Estimated Total Time:** 10 weeks  
**Estimated Effort:** 400-500 hours  
**Team Size:** 2-3 developers recommended

**Let's build Beenzer v2.0! 🚀**

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-11-11  
**Author:** [@alexcolls](https://github.com/alexcolls)  
**Status:** 📋 Planning Complete - Ready to Execute
