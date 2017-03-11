import {addTodo, generateId} from './todoHelpers';

// custom assertion
expect.extend({
  toBeInteger(received /*, can also have arguments for our validation */) {
    const resultPasses = typeof received == 'number' && received % 1 === 0;
    // another possibility: could use Number.isInteger (ES6) or just
    // Math.floor(number) === number

    if (resultPasses) {
      return {
        pass: true,
        message: () => `expected ${received} to be an integer`,
      };
    } else {
      return {
        pass: false,
        message: () => `expected ${received} to be an integer`,
      }
    }
  },
});

describe('addTodo function', () => {
  // common structure: Arrange, Act, Assert
  test('addTodo should add the passed todo to the list', () => {
    const startTodos = [
      {
        id: 1,
        name: 'one',
        isComplete: false,
      },
      {
        id: 2,
        name: 'two',
        isComplete: false,
      },
    ];

    const newTodo = {
      id: 3,
      name: 'three',
      isComplete: false,
    };

    // can't just do something like expected = concat or something, as that's
    // what addTodo would be doing - we need the literal result just copied out!
    const expected = [
      {
        id: 1,
        name: 'one',
        isComplete: false,
      },
      {
        id: 2,
        name: 'two',
        isComplete: false,
      },
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    // Act: call the code under test
    const result = addTodo(startTodos, newTodo);

    expect(result).toEqual(expected);
  });

  // test #2: no mutation
  test('addTodo should not mutate the existing todo array', () => {
    // step 1: arrange (set up test data)

    const startTodos = [
      {
        id: 1,
        name: 'one',
        isComplete: false,
      },
      {
        id: 2,
        name: 'two',
        isComplete: false,
      },
    ];

    const newTodo = {
      id: 3,
      name: 'three',
      isComplete: false,
    };

    // can't just do something like expected = concat or something, as that's
    // what addTodo would be doing - we need the literal result just copied out!
    const expected = [
      {
        id: 1,
        name: 'one',
        isComplete: false,
      },
      {
        id: 2,
        name: 'two',
        isComplete: false,
      },
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    // step 2: Act: invoke the function under test
    const result = addTodo(startTodos, newTodo);

    // Step 3: Assert: evaluate the results
    expect(result).not.toBe(startTodos); // don't want the same object
  });
});

describe('generateId function', () => {
  // test() = it()
  test('generateId should return a number between 0 (inclusive) and 100,000 (exclusive)', () => {
    const MIN_EXPECTED = 0;
    const MAX_EXPECTED = 99999;

    const numTestRuns = 20000;

    // since you modify the loop variable (i++), you must use let here; can use const
    // or let for for-of loops, since that is rebinding each time (this loop does also,
    // but we modify the variable before the next binding, since the i++ is part of the
    // body, so const would have an error; if you just were referencing/not modifying,
    // const would be fine)
    // TODO: I assume there is some repeat method for this
    for (let i = 0; i < numTestRuns; i++) {
      const result = generateId();

      expect(result).toBeGreaterThanOrEqual(MIN_EXPECTED);
      expect(result).toBeLessThanOrEqual(MAX_EXPECTED);

      expect(result).toBeInteger();
    }
  });
});