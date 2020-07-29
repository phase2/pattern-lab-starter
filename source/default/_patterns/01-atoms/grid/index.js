/**
 * grid
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module template
import './_grid.twig';
import './_grid--1-up.twig';
import './_grid--2-up.twig';
import './_grid--3-up.twig';
import './_grid--4-up.twig';

export const name = 'grid';

export const defaults = {
  dummyClass: 'js-grid-exists',
};

/**
 * Components may need to run clean-up tasks if they are removed from DOM.
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Pertinent settings
 */
// eslint-disable-next-line no-unused-vars
export function disable($context, settings) {}

/**
 * Each component has a chance to run when its enable function is called. It is
 * given a piece of DOM ($context) and a settings object. We destructure our
 * component key off the settings object and provide an empty object fallback.
 * Incoming settings override default settings via Object.assign().
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Settings object
 */
export function enable($context, { grid = {} }) {
  // Find our component within the DOM
  const $grid = $('.grid', $context);
  // Bail if component does not exist
  if (!$grid.length) {
    return;
  }
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, grid);
  // An example of what could be done with this component
  $grid.addClass(settings.dummyClass);
}

export default enable;