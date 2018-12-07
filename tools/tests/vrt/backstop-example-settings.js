/**
 * This example demonstrates how to create settings for a given testing scenario
 * for backstopjs. By replicating this setup, one can create multiple types of
 * tests and test groups for running Backstop VRT.
 */

module.exports = () => {
  // Set which resolutions to take screenshots at.
  const viewports = [
    {
      name: 'desktop',
      width: 1401,
      height: 1500,
    },
    {
      name: 'mobile',
      width: 720,
      height: 1280,
    },
  ];

  // Set the defaults for all of the screenshots. This can be used to powerfully
  // modify the page before capturing.
  const defaultScenarioSettings = {
    hideSelectors: [],
    removeSelectors: [],
    selectorExpansion: true,
    selectors: [],
    readyEvent: null,
    delay: 500,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
    onBeforeScript: '',
    onReadyScript: '',
  };

  // Set which pages to capture, and how to label them.
  const scenarios = [
    {
      label: 'article',
      url: 'http://0.0.0.0:8080/pl/?p=pages-article',
      ...defaultScenarioSettings,
    },
    {
      label: 'homepage',
      url: 'http://0.0.0.0:8080/pl/?p=pages-homepage',
      ...defaultScenarioSettings,
    },
  ];

  return {
    id: 'particle_backstop',
    viewports,
    scenarios,
    paths: {
      bitmaps_reference: 'tools/tests/vrt/backstop_data/bitmaps_reference',
      bitmaps_test: 'tools/tests/vrt/backstop_data/bitmaps_test',
      casper_scripts: 'tools/tests/vrt/backstop_data/casper_scripts',
      html_report: 'tools/tests/vrt/backstop_data/html_report',
      ci_report: 'tools/tests/vrt/backstop_data/ci_report',
    },
    casperFlags: [],
    engine: 'phantomjs',
    report: ['browser', 'CI'],
    debug: false,
  };
};