

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

export const createTodo = newTodo => {
  return fetch(baseUrl, {
    method: 'POST', // specify options for post request
    headers: {
      // headers: https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
      Accept: 'application/json', // accept a JSON object as a response (Accept = what media types are acceptable for the response)
      // use this to limit what types you want o allow in the response

      'Content-Type': 'application/json', // our content type that we are sending up in our post body
    },
    body: JSON.stringify(newTodo), // serialize what we are submitting
  }).then(response => response.json());
  // again here, we have a Promise returned from fetch, and then when that is available,
  // we take its value (Response object) and return another promise that will resolve
  // to the parsed Response JSON content
  // it may be that Response#json is available synchronously, but since we
  // have a promise, we must observe asynchronously
};

// put request - existing todos
export const saveTodo = todo => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(todo),
  }).then(response => response.json()); // returning back a promise again here
  // remember here that we are returning the chained promise of fetch.then to
  // listen to; we then chain to that promise; the server will resolve the
  // put request and then return a value, which will resolve the first
  // promise (Fetch); this will then schedule the response => response.json()
  // onFulfilled callback on the jobs queue - when it gets to the jobs queue,
  // this gets executed and returns a promise value containing the json
  // content of the server response; this full promise that we have listened
  // to (fetch.then => promise) is now resolved, so any listener we set up
  // against this return promise (to consume it always async, regardless of how
  // the promise was fulfilled in the chain upstream) will now be put on the
  // jobs queue
};
// TODO: for unit testing these functions, likely need a mock server