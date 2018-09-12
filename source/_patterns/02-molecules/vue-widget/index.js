/**
 * Example Vue widget
 *
 * An example of a testable, standalone, javascript-driven widget that has its own store
 * for state-based logic. That store can make whatever api calls you need it to.
 *
 * Note the use of this file (`vueWidget/index.js`) as the "implementation" of the actual
 * javascript application that resides in `vueWidget/src/index.js`. Double note that if you
 * are trying to see the Vue devtools in browser, you need to open the pattern outside
 * Pattern Lab's iframe.
 */

// Module dependencies
import 'protons';
import VueWidget from './src';

export const name = 'vueWidget';

export function enable() {
  // Since the app is mounted as soon as possible in src/index.js, use enable()
  // to pass in any data from outside apps (cough Drupal cough)
  // @TODO: This always fires. Update to run only on visible.
  VueWidget.$store.dispatch('vueWidget/getCardItems');
}

export function disable() {}

export default enable;