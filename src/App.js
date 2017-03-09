import React, { Component } from 'react';
// things to notice here: 'react' module exports React by default but has
// other named exports as well, which we capture here; vs. the previous
// video lessons, where we just did the default import of React and then
// extends React.Component

import logo from './logo.svg'; // interesting that webpack can allow you to load files!
import './App.css'; // CSS modules

class App extends Component {
  // if no constructor provided, then the default looks like this:
  /*
  constructor(...args) {
    super(...args);
  }
   */
  constructor() {
    super(); // constructor for extending component gets called
    // remember here: unlike in ES5-style classes, in ES6, the actual object
    // after new is created in the superclass constructor function first; ES5
    // actually has the subclass constructor (what follows new) create the
    // object and then can use constructor stealing after that to populate
    // superclass fields
    // must call super in order to access this - cannot do before - this is
    // because the actual object is created in the superclass constructor

    this.state = {
      todos: [
        {
          id: 1,
          name: 'Learn React',
          isComplete: false,
        },
        {
          id: 2,
          name: 'Build awesome app',
          isComplete: false,
        },
        {
          id: 3,
          name: 'Ship it',
          isComplete: true,
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <form>
            <input type="text" />
          </form>
          <div className="Todo-List">
            <ul>
              {this.state.todos.map(todo =>
                <li key={todo.id}>
                  <input type="checkbox" defaultChecked={todo.isComplete}/>
                  {todo.name}
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
