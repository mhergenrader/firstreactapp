

// eh, I guess we could use this function, since we have the repeated pattern
// of not wanting to redefine our function context (keeping null as the this value),
// but this seems a bit overkill (and good practice of spread, rest, and binding, I guess :-D)
export const partial = (functionToBind, ...partialApplyArgs) =>
  functionToBind.bind(null, ...partialApplyArgs);


