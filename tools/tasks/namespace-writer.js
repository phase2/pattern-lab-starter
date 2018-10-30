const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');

/**
 * Take a design system namespaces object and convert it to relative paths for
 * app. Write results to config yaml.
 *
 * @param {Object} namespaces - Namespace object generated by design system
 * @param {Object} config - app config
 * @param {Object} config.namespaces - app config around namespace conversion
 * @param {Function} config.namespaces.config - Path to config yaml to read/write
 * @param {Function} config.namespaces.atKey - Lodash set string of path in object
 * @param {Function} config.namespaces.transform - Function to convert path
 * @returns {Function} - Return a closure ready to accept callback
 */
module.exports = function namespaceWriter(namespaces, config) {
  // Returns a function
  return done => {
    // Create namespace paths in the correct relative path each app needs
    const relNamespaces = Object.keys(namespaces).reduce((acc, cat) => {
      acc[cat] = {
        paths: [].concat(
          ...namespaces[cat].paths.map(atomicPath =>
            // Each app provides its own transform function :)
            config.namespaces.transform(atomicPath)
          )
        ),
      };
      return acc;
    }, {});

    // Read and then write app config
    fs.readFile(config.namespaces.config, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        return done();
      }
      // Now load contents
      const appConfig = yaml.safeLoad(data);
      // Use lodash and key shorthand to set key/values
      _.set(appConfig, config.namespaces.atKey, relNamespaces);
      // Write to fs
      return fs.writeFile(
        config.namespaces.config,
        yaml.safeDump(appConfig, { lineWidth: Infinity }),
        'utf8',
        writeErr => {
          if (writeErr) {
            console.error(writeErr);
            return done();
          }
          return done();
        }
      );
    });
  };
};
