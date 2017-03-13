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
// RESOLVED: see the index.js file here - this is NOT an ES6 convention - it is node
// and webpack-supported/based
import {TodoForm, TodoList} from './components/todo';
import {addTodo, findTodoById, toggleTodoCompletion, updateTodo, removeTodo, generateId} from './lib/todoHelpers';
import {partial, compose} from './lib/utils';

class App extends Component {
  // if no constructor provided, then the default looks like this:
  /*
  constructor(...args) {
    super(...args);
  }
   */

  // property initializer syntax (looks familiar from TS, and React ships
  // w/ configuration to allow this by default from create-react-app)
  // thus, we don't have to put this in the constructor
  state = {
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

  // after shifting to property initializer syntax, we have a constructor
  // that just calls super, which creates a "useless constructor" warning,
  // since that's all a default constructor does anyway
  //constructor() {
  //  super(); // constructor for extending component gets called
    // remember here: unlike in ES5-style classes, in ES6, the actual object
    // after new is created in the superclass constructor function first; ES5
    // actually has the subclass constructor (what follows new) create the
    // object and then can use constructor stealing after that to populate
    // superclass fields
    // must call super in order to access this - cannot do before - this is
    // because the actual object is created in the superclass constructor

    // notice how we have moved this above!
    /*this.state = {
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
    };*/

    // remember: when you reference functions inside this class, they are
    // not (no longer) autobound like for React.createClass, so must do
    // this ourselves, since just using the function as an R-value has it
    // invoked as a function w/o the class context
    /*this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // since we refer to "this" in the callback function, which is our component (to access state, etc.)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);*/

    // actually, now we're using property initializer syntax below now, so
    // we no longer have to do these explicit bindings - create-react-app
    // comes with this directly!
  //}

  // can avoid ugly conditional code in submit handler for validation - can
  // keep in own function
  // notice here that this is property initializer syntax for the class - this
  // means that these are now actually bound methods on the class, where this
  // is the containing class
  // this is reminiscent of what you saw in TS - notice the different syntax
  // from just method syntax:
  // handleSubmit(event) {
  handleSubmit = (event) => {
    event.preventDefault(); // prevent form from doing default submit of GET request and refreshing page
    
    const newTodo = {
      id: generateId(),
      name: this.state.currentTodo,
      isComplete: false,
    };

    const updatedTodos = addTodo(this.state.todos, newTodo); // get new list
    this.setState({
      todos: updatedTodos, // now refer to this new list
      currentTodo: '', // reset current form
      errorMessage: '', // clear any error message (could also do this in handleInputChange)
    });
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a TODO name',
    });
  }

  // again: interesting that we need to bind this ourselves in the constructor
  // in ES6; seems like React does this automatically for React.createElement
  // actually: React removed this capability for ES6:
  // http://blog.andrewray.me/react-es6-autobinding-and-createclass/
  // React.createClass creates mixins, autobinds this; this was removed for ES6
  // now, all class methods here are still just functions, so we must bind
  // ourselves - site above has some options for this, with this video series
  // preferring the constructor version of this
  // shorthand arrow functions could be a thing in ES7: (experimental feature)
  // handleInputChange = () => { ... }; this would take the lexical scope
  // of class
  handleInputChange = (event) => {
    // do NOT do this.state.currentTodo = event.target.value;
    // not only will this not trigger a rerender, but you lose any sort
    // of auditing/tracking of changes
    this.setState({
      currentTodo: event.target.value,
    });
  }

  handleToggle = (id) => {
    // just shortened some code here - notice the partial call because
    // updateTodos takes two arguments - we need to include the this.state.todos
    const getUpdatedTodos = compose(findTodoById, toggleTodoCompletion, partial(updateTodo, this.state.todos));

    //const todoItem = findTodoById(id, this.state.todos);
    //const toggledTodo = toggleTodoCompletion(todoItem); // new todo object returned
    //const updatedTodosList = updateTodo(this.state.todos, toggledTodo); // new list here

    this.setState({
      todos: getUpdatedTodos(id, this.state.todos),
    });
  };

  handleRemove = (id, event) => {
    event.preventDefault(); // will remove todo from clickable link; we don't want the link
    // to follow through updating address bar

    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos,
    });
  };

  render() {
    // note that render is called as a byproduct of whenever the setState function is 
    // called, and so what we can do is check for whether the field is empty at each
    // state change here rather than wait for full submit event and then a bunch
    // of conditional logic in there
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;

    // notice also the analog for ngShow here: we just evaluate a JS expression
    // of whether some condition holds, and if so, we return the span tag as an 
    // expression
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm currentTodo={this.state.currentTodo}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={submitHandler} />
          <TodoList todos={this.state.todos}
                    handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove} />
        </div>
      </div>
    );
  }
}

export default App;
