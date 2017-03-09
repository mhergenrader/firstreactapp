import React from 'react';

// doing a plain functional stateless component

export const TodoForm = (props) => (
  <form>
    <input type="text"
           value={props.currentTodo}
           onChange={props.handleInputChange}/>
  </form>
);