import {addTodo, findTodoById, toggleTodoCompletion, updateTodo, generateId} from './todoHelpers';

// simple to quickly ad-hoc skip tests or test groups: just do .skip
// conversely, can use the .only on describe or test as the complement
// shorthand version (that does the same thing - only run this out of the
// group of same type of blocks, so don't have to write a bunch of skips)



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
    expect(result).not.toBe(startTodos); // don't want the same object (toBe = reference equality)
  });
});

// writing this one in TDD style!
describe('findTodoById function', () => {
  test('findTodoById should return expected item from array', () => {
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
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    const expectedToFind = {
      id: 2,
      name: 'two',
      isComplete: false,
    };

    // made this a generic variable in case want to refactor tests later - this
    // creates an abstraction over the general "normative" use case of "finding
    // and getting successfully some item by valid and existing ID in the list"
    // if we just used 2 hardcoded, then (a) this test would be harder to
    // refactor and (b) it more represents a specific test case as such: "find
    // should return item with ID 2 from array". This is slightly pedantic but
    // useful to think about, as we are representing the case w/ this test
    // case of finding some ID i that should exist in our list.
    const idToLookFor = 2;

    const findResult = findTodoById(idToLookFor, startTodos);
    expect(findResult).toEqual(expectedToFind); // note: toEqual here means recursive =, vs. toBe, which checks for identity (different from tape node module, which has equal for reference check and deepEqual for recursive check)
  });
});

describe('toggleTodoCompletion function', () => {
  // recall: it = test in jest
  it('should toggle the isComplete property of a todo object', () => {
    const startTodo = {
      id: 1,
      name: 'one',
      isComplete: false,
    };

    const expectedToggledTodo = {
      id: 1,
      name: 'one',
      isComplete: true,
    };

    // make sure to test both directions!

    const toggledTodoResult = toggleTodoCompletion(startTodo);
    expect(toggledTodoResult).toEqual(expectedToggledTodo);

    const reverseToggleResult = toggleTodoCompletion(toggledTodoResult);
    expect(reverseToggleResult).toEqual(startTodo);
  });

  it('should not mutate the original todo object passed in', () => {
    const startTodo = {
      id: 1,
      name: 'one',
      isComplete: false,
    };

    const toggledTodoResult = toggleTodoCompletion(startTodo);

    // we have tested the preconditions above against the same object, so no
    // need to repeat here, since making the exact same call - this is a disjoint
    // test case against the same object/call tuple that we had from before -
    // just splitting out for better isolation and readability

    expect(toggledTodoResult).not.toBe(startTodo); // not same object reference
  });

});

// updateTodo(todoList, updatedTodo)
// this function should take in an updatedTodo and then return a new list
// with the new item replacing a matched item in the original list
describe('updateTodo function', () => {
  // TODO: could add more tests here about the signature of the function and
  // inputs, etc.

  it('should update an item by id', () => {
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
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    const expectedTodos = [
      {
        id: 1,
        name: 'one',
        isComplete: false,
      },
      {
        id: 2,
        name: 'two',
        isComplete: true,
      },
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    const updatedTodoItem = {
      id: 2,
      name: 'two',
      isComplete: true, // changing isComplete flag from false to true
    };

    const updatedTodosList = updateTodo(startTodos, updatedTodoItem);
    expect(expectedTodos).toEqual(updatedTodosList); // deep recursive check of properties
  });

  // beforeEach would be very handy here...
  it('should not update the original array', () => {
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
      {
        id: 3,
        name: 'three',
        isComplete: false,
      },
    ];

    const updatedTodoItem = {
      id: 2,
      name: 'two',
      isComplete: true, // changing isComplete flag from false to true
    };

    // again, this is a disjoint test over the same preconditions/invocation
    // as before - just breaking out this test for readability (we want the
    // assertion to be labeled under a different it/test tag line)
    const updatedTodosList = updateTodo(startTodos, updatedTodoItem);
    expect(updatedTodosList).not.toBe(startTodos); // don't want the same reference - don't mutate in place!
  });

  // TODO: should add tests for cases where we update with an item that doesn't
  // already have a matching id in the array
});


describe('generateId function', () => {
  // test() = it()
  it('should return a number between 0 (inclusive) and 100,000 (exclusive)', () => {
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