import React from 'react';

// key was originally in the sibling setup here inside the actual collection;
// now, since the key got moved, React can't just see it directly - we need
// it back at the level of where we are looping/setting up our collection for
// renderings
export const TodoItem = (props) => (
  //<li key={props.id}>
  <li>
    <input type="checkbox" defaultChecked={props.isComplete}/>
    {props.name}
  </li>
);