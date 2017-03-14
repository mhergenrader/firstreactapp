

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

export const createTodo = (newTodo) => {
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