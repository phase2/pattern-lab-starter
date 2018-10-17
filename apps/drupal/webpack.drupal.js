/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

const { PATH_DIST } = require('../../config');

// Design system
const designSystem = require('../../source/default/webpack.default');

// Particle base settings
const particle = require('../../particle');

const shared = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    'app-drupal': [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(PATH_DIST, 'app-drupal/assets'),
    publicPath: 'app-drupal/assets',
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
  ],
};

const dev = {
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new RunScriptAfterEmit({
      exec: [
        // prettier-ignore
        `echo \n🚀 Webpack Drupal ${process.env.NODE_ENV} build complete! 
        Edit apps/drupal/webpack.drupal.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

const prod = {
  stats: {
    children: false,
    entrypoints: false,
  },
};

module.exports = particle(
  // app
  { shared, dev, prod },
  // Default design system
  designSystem,
  // Use extract css
  {
    cssMode: 'extract',
    entry: 'app-drupal', // Called out specifically because 2 entry points
  }
);
