

const baseUrl = 'http://localhost:8080/todos'; // where serving todos

// load todos into app when app starts

export const loadTodos = () => {
  // fetch returns response object - want JSON formatted object out of this;
  // and fetch subscribes to Promise API
  return fetch(baseUrl)
    .then(response => response.json());
    // this then returns another promise with just the JSON formatted data
    // wrapped up
    // remember: when you return a value from .then, a new promise is
    // created wrapping around that possible value
    // in this case, we are actually just returning a promise itself (since
    // that is what response.json returns)
};