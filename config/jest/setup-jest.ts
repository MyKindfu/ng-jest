import 'core-js/es7/object';
import 'jest-preset-angular';
import 'jest-zone-patch';
import './jest-global-mocks.ts';
import './jest-http-client-custom-matchers';
Error.stackTraceLimit = 2; // increase or comment this line if you want to see longer stack trace

Object.defineProperty(window, 'getComputedStyle', {
  value: (): any => ({
    getPropertyValue: (): any => {
      return '';
    },
  }),
});
