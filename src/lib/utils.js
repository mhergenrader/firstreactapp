

// eh, I guess we could use this function, since we have the repeated pattern
// of not wanting to redefine our function context (keeping null as the this value),
// but this seems a bit overkill (and good practice of spread, rest, and binding, I guess :-D)
export const partial = (functionToBind, ...partialApplyArgs) =>
  functionToBind.bind(null, ...partialApplyArgs);

// takes in two functions and just compose them together under another function 
const pipeTwo = (f, g) => (...args) => g(f(...args));

// handy - we simply just keep composing via accumulation - given f, g, ...,
// we get h = g(f(.)) after first two arguments, then get i(h(.)) after next
// pass, etc. recall that reduce, when no initial argument is given, just
// automatically starts with the first two values, where the first value is
// treated as the accumulator from the arrays
export const compose = (...functions) =>
  functions.reduce(pipeTwo); // since our pipeTwo function already in a reduce
  // combiner callback form anyway!
  //functions.reduce((accumulator, fn) => pipeTwo(accumulator, fn));


