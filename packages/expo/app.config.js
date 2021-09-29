const STAGE = process.env.STAGE;

const envConfig = {
  development: {
    scheme: 'com.poparazzi.app.development',
    icon: './assets/icon.development.png',
    backgroundColor: '#FF0000'
  },
  staging: {
    scheme: 'com.poparazzi.app.staging',
    icon: './assets/icon.staging.png',
    backgroundColor: '#8000FF'
  },
  production: {
    scheme: 'com.poparazzi.app',
    icon: './assets/icon.png',
    backgroundColor: '#1610FF'
  }
};

const config = envConfig[STAGE || 'development'];

export default {
  name: 'Poparazzi',
  description: 'Take photos of your friends',
  slug: 'poparazzi',
  scheme: 'poparazzi',
  owner: 'poolpoolpool',
  icon: config.icon,
  sdkVersion: '42.0.0',
  // runtimeVersion: '',
  version: '0.0.1',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000'
  },
  ios: {
    bundleIdentifier: config.scheme,
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription: `Enable access to your camera so you can take photos of your friends!`,
      NSContactsUsageDescription: `Enable contacts access to find your friends to follow and tag in pops! Your contacts will be uploaded to find friends.`,
      NSLocationWhenInUseUsageDescription: `Enable location services to find nearby friends!`,
      NSMicrophoneUsageDescription: `To record your audio`,
      NSPhotoLibraryAddUsageDescription: `To save recorded videos to your camera roll`,
      NSPhotoLibraryUsageDescription: `To help find photos and videos to share`
    }
  },
  android: {
    package: config.scheme,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: config.backgroundColor
    },
    jsEngine: 'hermes',
    permissions: ['READ_CONTACTS']
  },
  androidNavigationBar: {
    barStyle: 'light-content',
    backgroundColor: '#000000'
  },
  assetBundlePatterns: ['**/*'],
  orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0
  },
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: [
      'expo.ts',
      'expo.tsx',
      'expo.js',
      'expo.jsx',
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'wasm',
      'svg'
    ]
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'poparazzi',
          project: 'expo',
          authToken:
            'c43be4a5ea754ad1b88bdc5d179a65d0f36ced117e8040a08fe3f2bce4c3d9d8'
        }
      }
    ]
  },
  extra: {
    STAGE: process.env.STAGE,
    eas: {
      projectId: '23e98571-9480-46ce-a842-70584060cc5c'
    }
  },
  plugins: ['expo-camera', 'sentry-expo', './react-native-mmkv-plugin.js']
};
