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

// makes sense why we directly used the spread operator to pass in these
// items from the todo object in a more flat manner (where props just clones
// those properties in): now we can validate against them directly (vs.
// keeping them on props or something more nested)
/*
 todo -> props, where now props just absorbs what todo had via spread operator,
 which is an ES7? feature that does cloning:
 id
 name
 isComplete
*/
TodoItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool, // default to false (note: this is NOT named boolean)
};