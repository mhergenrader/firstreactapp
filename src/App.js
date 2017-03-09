import React, { Component } from 'react';
// things to notice here: 'react' module exports React by default but has
// other named exports as well, which we capture here; vs. the previous
// video lessons, where we just did the default import of React and then
// extends React.Component

import logo from './logo.svg'; // interesting that webpack can allow you to load files!
import './App.css'; // CSS modules

// clean this into single directory
//import {TodoForm} from './components/todo/TodoForm';
//import {TodoList} from './components/todo/TodoList';

// TODO
// interesting that we didn't need to include index here at end of path
// to collect - is this an ES6 feature or wrapped up in the build step?
import {TodoForm, TodoList} from './components/todo';

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
      currentTodo: '',
    };

    // remember: when you reference functions inside this class, they are
    // not (no longer) autobound like for React.createClass, so must do
    // this ourselves, since just using the function as an R-value has it
    // invoked as a function w/o the class context
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // again: interesting that we need to bind this ourselves in the constructor
  // in ES6; seems like React does this automatically for React.createElement
  // actually: React removed this capability for ES6:
  // http://blog.andrewray.me/react-es6-autobinding-and-createclass/
  // React.createClass creates mixins, autobinds this; this was removed for ES6
  // now, all class methods here are still just functions, so we must bind
  // ourselves - site above has some options for this, with this video series
  // preferring the constructor version of this
  // shorthand arrow functions could be a thing in ES7:
  // handleInputChange = () => { ... }; this would take the lexical scope
  // of class
  handleInputChange(event) {
    // do NOT do this.state.currentTodo = event.target.value;
    // not only will this not trigger a rerender, but you lose any sort
    // of auditing/tracking of changes
    this.setState({
      currentTodo: event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          <TodoForm currentTodo={this.state.currentTodo} handleInputChange={this.handleInputChange} />
          <TodoList todos={this.state.todos} />          
        </div>
      </div>
    );
  }
}

export default App;
