const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    new InjectManifest({
      swSrc: './service-worker.js',
      swDest: 'service-worker.js',
    }),
  ],
};
