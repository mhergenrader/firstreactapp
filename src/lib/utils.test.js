import {partial} from './utils';

const add = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;

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