import Constants from 'expo-constants';

export const STAGE = (Constants.manifest.extra?.STAGE ||
  process.env.STAGE ||
  process.env.NEXT_PUBLIC_STAGE ||
  'development') as 'development' | 'staging' | 'production';

const envConfig = {
  shared: {
    stage: STAGE
  },
  development: {
    website_url: 'http://localhost:3000',
    api_url: 'https://poparazzi.com',
    api_url_on_web: 'http://localhost:3000',
    session_cookie: 'development_session',
    user_cookie: 'development_user',
    cookie_domain: 'localhost',
    scheme: 'com.poparazzi.app.development'
  },
  staging: {
    website_url: `https://${process.env.VERCEL_URL || 'poparazzi.vercel.app'}`,
    api_url: 'https://poparazzi.com',
    api_url_on_web: `https://${
      process.env.VERCEL_URL || 'poparazzi.vercel.app'
    }`,
    session_cookie: 'staging_session',
    user_cookie: 'staging_user',
    cookie_domain: '.poparazzi.vercel.app',
    scheme: 'com.poparazzi.app.staging'
  },
  production: {
    website_url: `https://poparazzi.vercel.app`,
    api_url: 'https://poparazzi.com',
    api_url_on_web: 'https://poparazzi.vercel.app',
    session_cookie: 'production_session',
    user_cookie: 'production_user',
    cookie_domain: '.poparazzi.vercel.app',
    scheme: 'com.poparazzi.app'
  }
};

export const config = {
  ...envConfig.shared,
  ...envConfig[STAGE]
};
