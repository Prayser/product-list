const path = require('path');

module.exports = {
  webpack: {
    alias: {
      'shared': path.join(path.resolve(__dirname, './src/shared')),
      'entities': path.join(path.resolve(__dirname, './src/entities')),
      'features': path.join(path.resolve(__dirname, './src/features')),
      'pages': path.join(path.resolve(__dirname, './src/pages')),
    },
  },
};