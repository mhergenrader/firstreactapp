import React from 'react';

import {TodoItem} from './TodoItem';

// another stateless functional component
// remember that all JSX must have a single root element, so we need either
// the div here or the ul

// all properties of todo now passed as individual properties to the subcomponent

// note the comment in TodoItem: need to have the key directly where we are
// defining the collection
export const TodoList = (props) => (
  <div className="Todo-List">
    <ul>
      {props.todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </ul>
  </div>
);

