
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

export const addTodo = (todoList, newTodo) => [...todoList, newTodo];

export const generateId = () => Math.floor(Math.random() * 100000);