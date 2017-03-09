import React from 'react';

// doing a plain functional stateless component

export const TodoForm = (props) => (
  <form>
    <input type="text"
           value={props.currentTodo}
           onChange={props.handleInputChange}/>
  </form>
);

// remember (side note): classes and functions are minimally maximal: there
// are no official static properties or anything on classes/functions, so 
// regardless of which syntax you use to create components, just declare this
// as a normal property on it
TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
};