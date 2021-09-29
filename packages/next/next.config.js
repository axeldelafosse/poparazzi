const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withTM = require('next-transpile-modules')([
  'app',
  'dripsy',
  '@dripsy/core',
  'moti',
  '@motify/components',
  '@motify/core',
  '@motify/skeleton',
  '@motify/interactions',
  '@nandorojo/swr-react-native',
  '@gorhom/bottom-sheet',
  '@gorhom/portal',
  '@koale/useworker' // expo-camera
]);

const nextConfig = {
  experimental: {
    optimizeCss: true,
    esmExternals: 'loose'
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  images: {
    disableStaticImages: true,
    domains: ['d287itw250s1fg.cloudfront.net']
  },
  async headers() {
    const cacheHeaders = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ];
    return [
      { source: '/_next/static/:static*', headers: cacheHeaders },
      { source: '/fonts/:font*', headers: cacheHeaders }
    ];
  }
};

module.exports = withPlugins(
  [
    withTM,
    withFonts,
    [withImages, { inlineImageLimit: false }],
    // [withReactSvg, { include: [path.resolve(__dirname, '..')] }],
    withBundleAnalyzer,
    [withExpo, { projectRoot: __dirname + '/../..' }]
  ],
  nextConfig
);
