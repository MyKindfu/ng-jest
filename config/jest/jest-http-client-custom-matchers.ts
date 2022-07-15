/* tslint:disable:prefer-template */
import { HttpRequest } from '@angular/common/http';
import { trim, isEqual, mapValues, isEmpty, partial, pickBy, first } from 'lodash';
import * as jestDiff from 'jest-diff';

export interface HttpClientJestMatchers<R> {
  toMatchHttpClientHeaders(expectedHeaders: { [headerName: string]: string | string[] }): R;
  toMatchHttpClientHeader(expectedHeaderName: string, expectedHeaderValue: string | string[]): R;
  toMatchHttpClientParams(expectedParams: { [paramName: string]: string | string[] }): R;
  toMatchHttpClientParam(expectedParamName: string, expectedParamValue: string | string[]): R;
  toHaveHttpClientHeader(expectedHeaderName: string): R;
  toHaveHttpClientParam(expectedParamName: string): R;
}

interface MatcherReturnValue {
  pass: boolean;
  message(): string;
}

type Matcher = (this: jest.MatcherUtils, received: any, ...actual: any[]) => MatcherReturnValue;

type HeadersOrParams = 'headers' | 'params';

function checkReq(
  this: jest.MatcherUtils,
  matcherName: string,
  req: HttpRequest<any> | any,
): MatcherReturnValue | undefined {
  if (req instanceof HttpRequest) return;

  return {
    pass: this.isNot,
    message: (): string =>
      `${ this.utils.matcherHint((this.isNot ? '.not' : '') + matcherName) }\n\n`
      + 'Passed to expect(...) object should be an HttpClient instance.\n'
      + `Received (${ typeof req }):\n`
      + this.utils.printReceived(req),
  };
}

function checkName(
  this: jest.MatcherUtils,
  matcherName: string,
  name: string | any,
  type: HeadersOrParams,
): MatcherReturnValue | undefined {
  if (trim(name)) return;

  return {
    pass: this.isNot,
    message: (): string =>
      `${ this.utils.matcherHint((this.isNot ? '.not' : '') + matcherName) }\n\n`
      + (type === 'params' ? 'Param' : 'Header') + ' Name should be a not empty string\n'
      + `Received (${ typeof name }):\n`
      + this.utils.printExpected(name),
  };
}

function makeMessage(
  this: jest.MatcherUtils,
  { pass, matcherName, type, expected, actual, single }:
    { pass: boolean; matcherName: string; type: HeadersOrParams; expected: any; actual: any; single: boolean },
): MatcherReturnValue {
  const preparedExpected = single && Array.isArray(expected) && expected.length === 1 ? first(expected) : expected;
  const preparedActual   = single && Array.isArray(actual)   && actual.length   === 1 ? first(actual)   : actual;

  const message = pass
    ? (): string =>
      this.utils.matcherHint(`.not${ matcherName }`)
      + '\n\n'
      + `Expected request to not match ${ (type === 'params' ? 'param(s)' : 'header(s)') }:\n`
      + `  ${ this.utils.printExpected(preparedExpected) }\n`
      + `Received:\n`
      + `  ${ this.utils.printReceived(preparedActual) }`

    : (): string => {
      const diffString = jestDiff(preparedExpected, preparedActual, {});

      return this.utils.matcherHint(matcherName)
        + '\n\n'
        + `Expected request to match ${ (type === 'params' ? 'param(s)' : 'header(s)') }:\n`
        + `  ${ this.utils.printExpected(preparedExpected) }\n`
        + `Received:\n`
        + `  ${ this.utils.printReceived(preparedActual) }`
        + (diffString ? `\n\nDifference:\n\n${diffString}` : '')
        ;
    }
  ;

  return { pass, message };
}

const getAll = (req: HttpRequest<any>, type: HeadersOrParams, name: string): string[] | undefined => {
  const all = req[type].getAll(name);

  return all ? all.sort() : undefined;
};

function toMatchHttpClientHeaderOrParam(
  this: jest.MatcherUtils,
  type: HeadersOrParams,
  matcherName: string,
  req: HttpRequest<any>,
  name: string,
  value: string | string[],
): MatcherReturnValue {
  const notReq = checkReq.call(this, matcherName, req);
  if (notReq) return notReq;

  const invalidName = checkName.call(this, matcherName, name, type);
  if (invalidName) return invalidName;

  const actual = getAll(req, type, name);
  const expected = [].concat(value).sort();
  const pass = isEqual(actual, expected);

  return makeMessage.call(this, { pass, matcherName, type, expected, actual, single: true });
}

function toMatchHttpClientHeadersOrParams(
  this: jest.MatcherUtils,
  type: HeadersOrParams,
  matcherName: string,
  req: HttpRequest<any>,
  matchMap: {[name: string]: string | string[]},
): MatcherReturnValue {
  const notReq = checkReq.call(this, matcherName, req);
  if (notReq) return notReq;

  if (isEmpty(matchMap)) {
    return {
      pass: this.isNot,
      message: (): string =>
        `${ this.utils.matcherHint((this.isNot ? '.not' : '') + matcherName) }\n\n`
        + (type === 'params' ? 'Param' : 'Header') + ' Name should be a not empty object\n'
        + `Received (${ typeof matchMap }):\n`
        + this.utils.printExpected(matchMap),
    };
  }

  const actual = pickBy(mapValues(matchMap, (val, name) => getAll(req, type, name)));
  const expected = mapValues(matchMap, val => [].concat(val).sort());
  const pass = isEqual(actual, expected);

  return makeMessage.call(this, { pass, matcherName, type, expected, actual });
}

function toHaveHttpClientHeaderOrParam(
  this: jest.MatcherUtils,
  type: HeadersOrParams,
  matcherName: string,
  req: HttpRequest<any>,
  name: string,
): MatcherReturnValue {
  const notReq = checkReq.call(this, matcherName, req);
  if (notReq) return notReq;

  const invalidName = checkName.call(this, matcherName, name, type);
  if (invalidName) return invalidName;

  const pass = req[type].has(name);
  const actual = req[type].getAll(name);

  const message = pass
    ? (): string => this.utils.matcherHint(`.not${ matcherName }`)
                  + '\n\n'
                  + `Expected request to not hove ${ (type === 'params' ? 'param' : 'header') }:\n`
                  + `  ${ this.utils.printExpected(name) }\n`
                  + `Received:\n`
                  + `  ${ this.utils.printReceived(actual) }`

    : (): string => this.utils.matcherHint(matcherName)
                  + '\n\n'
                  + `Expected request to have ${ (type === 'params' ? 'param' : 'header') }:\n`
                  + `  ${ this.utils.printExpected(name) }\n`
                  + `Received:\n`
                  + `  ${ this.utils.printReceived(actual) }`
  ;

  return { pass, message };
}

const bind = (fn: (...args: any[]) => any, type: HeadersOrParams, matcherName: string): Matcher =>
  partial(fn, type, matcherName);

/**
 * This interface copied from `@types/jest` because of `@types/jest` have invalid typings for 20.x jest version.
 * The problem is in `actual` argument. Actually a jest matcher can handle any number of params, however, in that
 * typings specified only first.
 */
type ExpectExtendMap = Record<keyof HttpClientJestMatchers<any>, Matcher>;

const matchers: ExpectExtendMap = {
  toMatchHttpClientHeader:  bind(toMatchHttpClientHeaderOrParam,   'headers', '.toMatchHttpClientHeader'),
  toMatchHttpClientHeaders: bind(toMatchHttpClientHeadersOrParams, 'headers', '.toMatchHttpClientHeaders'),
  toMatchHttpClientParam:   bind(toMatchHttpClientHeaderOrParam,   'params',  '.toMatchHttpClientParam'),
  toMatchHttpClientParams:  bind(toMatchHttpClientHeadersOrParams, 'params',  '.toMatchHttpClientParams'),
  toHaveHttpClientHeader:   bind(toHaveHttpClientHeaderOrParam,    'headers', '.toHaveHttpClientHeader'),
  toHaveHttpClientParam:    bind(toHaveHttpClientHeaderOrParam,    'params',  '.toHaveHttpClientParam'),
};
expect.extend(matchers);
