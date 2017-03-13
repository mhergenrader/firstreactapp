
// using arrow function here = this = "module" this?
/*export const addTodo = (todoList, newTodo) => {
  //todoList.push(newTodo);
  //return todoList; // don't want to modify the original array

  // now we don't modify the original array - we return a concatenated
  // new array of the original items (spread out and inserted into slots
  // of this new array via operator) and our latest todo
  // equiv: todoList.concat(newTodo)
  // equiv: todoList.concat([newTodo]) (either ok w/ concat for just one item)
  return [...todoList, newTodo];
};*/ // just cleaning up a bit

// ES6 modules top-level "this" is undefined

export const addTodo = (todoList, newTodo) => [...todoList, newTodo];

// using the ES6 .find method on arrays: returns the object if the predicate
// passes (find first) or undefined if not found
// using destructuring here for the parameters to just pull out the ID of
// each element directly to simplify the predicate
export const findTodoById = (idToFind, todoList) =>
  todoList.find(({id: listItemId}) => listItemId === idToFind);

// Returns a new TODO object with everything the same except the flipped 
// isComplete boolean flag
/*export const toggleTodoCompletion =
  todo => Object.assign({}, todo, {
    isComplete: !todo.isComplete
  });*/

// even handier: use the object spread operator!
// notice here that it will first take all the values from the original todo
// object and clone them into a new object (given by the literal {} syntax,
// just like for arrays like above - nothing special here), and then it will
// parse the next expression to then set the literal property isComplete to
// some value as well
// just like before, we are not modifying the original todo item - immutability
export const toggleTodoCompletion =
  todo => ({...todo, isComplete: !todo.isComplete,}); // and the parentheses to ensure parser doesn't confuse for a block
/*
expanded out like this:

return {
  ...todo, // spreads all enumerable own properties here into this new object created via the literal
  isComplete: !todo.isComplete,
}
more here: http://www.2ality.com/2016/10/rest-spread-properties.html
important: order matters here, since apparently objects now store keys in insertion order?

*/

// Returns a new todos list with the new todo in place of the original
// Replace existing item with updated item
export const updateTodo = (todosList, updatedTodoItem) => {
  const updatedIndex = todosList.findIndex(
    ({id: listItemId}) => updatedTodoItem.id === listItemId);
  
  if (~updatedIndex) {
    // notice how we are making an entirely new array here, with copied references
    // to our existing items surrounding the insertion of a reference to this new item
    // TODO: couldn't we also just do something like [...todosList].splice(updatedIndex, 1, updatedTodoItem),
    // since that would copy all references to a new array and then just overwrite in this new
    // array first?
    // RESOLVED: yes, you could do this also - all that we care about w/ respect to maintaining
    // immutability is that the value we are using for setState is a different object/array,
    // such that the reference equality check returns false; thus, can also just do
    // todosList.concat, and then modify that new value inline, as this is a different
    // array from the todosList input argument
    return [
      ...todosList.slice(0, updatedIndex), 
      updatedTodoItem,
      ...todosList.slice(updatedIndex + 1)
    ];
  }

  // TODO: what if the index not found? (I guess we assume it is for now)
  // could decide to throw an error or we could decide to make this more like
  // a PUT operation and append if not already found  
};

export const removeTodo = (todosList, idToRemove) => {
  const indexToRemove = todosList.findIndex(
    ({id: todoId}) => todoId === idToRemove);

  if (~indexToRemove) {
    // NOTE: just like we mention above, it doesn't matter how we create the 
    // new array, as long as you make a new array - you could slice and then
    // splice if you want - it doesn't matter; just as long as you're returning
    // a new array and don't modify the original; this implementation here
    // is handy because it is quite similar to update - only difference is
    // that we just take things on both sides of the existing item and don't
    // include the item itself!
    return [
      ...todosList.slice(0, indexToRemove),
      ...todosList.slice(indexToRemove + 1),
    ];
  }

  // TODO: should throw error or otherwise just fail out here if the index
  // was not found for some ID
};


export const generateId = () => Math.floor(Math.random() * 100000);