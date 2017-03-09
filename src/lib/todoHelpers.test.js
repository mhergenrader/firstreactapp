import {addTodo} from './todoHelpers';

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