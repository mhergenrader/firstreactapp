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
      {props.todos.map(todo => <TodoItem key={todo.id} handleToggle={props.handleToggle} {...todo} />)}
    </ul>
  </div>
);

// this is essentially our interface out to anyone trying to reuse this
// component of what is needed/expected as the contract for using it
TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
};

