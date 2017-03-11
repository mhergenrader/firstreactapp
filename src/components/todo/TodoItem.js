import React from 'react';
import {partial} from '../../lib/utils';

// key was originally in the sibling setup here inside the actual collection;
// now, since the key got moved, React can't just see it directly - we need
// it back at the level of where we are looping/setting up our collection for
// renderings

// we have an arrow function for toggle because we want to send back up an id;
// we have a case where we have some event object (what the arrow function would
// receive but we ignore) but don't want to send the event object; quite common
// for when dealing w/ collections
// switched defaultChecked to checked since we now have associated onChange
// handler defined
export const TodoItem = (props) => {
  //<li key={props.id}>
  //const handleToggle = props.handleToggle.bind(null, props.id); // this = null since not interested in resetting context
  // TODO: what is the default context in ES6? still undefined in strict mode? are we strict mode by default?
  
  const handleToggle = partial(props.handleToggle, props.id);
  return (
    <li>
      <input type="checkbox"
            checked={props.isComplete}
            onChange={handleToggle} />
      {props.name}
    </li>
  );
};

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