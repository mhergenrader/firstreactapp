import {partial, compose} from './utils';

const add = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;

const inc = number => number + 1;
const double = number => number * 2;

// describe just groups together a few tests into semantic groups to make things
// easier to read

describe('partial function', () => {
  it('applies the first argument ahead of time', () => {
    const inc = partial(add, 1);
    const result = inc(2);
    expect(result).toBe(3);
  });

  it('applies multiple arguments ahead of time', () => {
    const inc = partial(addThree, 1, 2);
    const result = inc(3);
    expect(result).toBe(6);
  });
});

describe('compose function', () => {
  /*beforeAll(() => {
    const inc = number => number + 1;
    const dbl = number => number * 2;
  });*/// looks like these need to be accessible in scope - these seem to
  // be just function scope-contained, so not accessible
  // seems like the before and after fn's need to just set up already
  // declared/existing state

  it('passes the results of inc to dbl', () => {
    const pipeline = compose(inc, double);
    const result = pipeline(2);
    expect(result).toBe(6);
  });

  it('passes the results of dbl to inc', () => {
    const pipeline = compose(double, inc);
    const result = pipeline(2);
    expect(result).toBe(5);
  });

  it('works with more than two functions', () => {
    const pipeline = compose(add, inc, double, inc); // add is the innermost function applied first
    const result = pipeline(1, 2); // two arguments here, since add is our first operation
    expect(result).toBe(9);
  });
});