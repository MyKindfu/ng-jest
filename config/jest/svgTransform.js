// Simple transformer needed to solve problem with "svg" in tests.
module.exports = {
    process() {
      return 'module.exports = {};';
    },
    getCacheKey() {
      return 'svgTransform';
    },
  };
  