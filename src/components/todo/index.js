// import all components in directory and reexport them as single source!

// learned that this setup of index.js and just importing from a directory
// path in the import vs. having to list out the entire path is a Node.js
// convention - it has nothing to do w/ ES6 - it is just a nice shorthand
// where we have our tooling (Node, and then webpack seems to support the 
// same convention) look at the path and see a folder name at the end instead
// of a js file and then resolve that to look at the index.js file in that
// folder

// cool quick import -> re-export
// imports and then immediately exports
export {TodoForm} from './TodoForm';
export {TodoList} from './TodoList';
export {Footer} from './Footer';