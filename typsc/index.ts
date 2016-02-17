"use strict";

console.log("welcome typescript");

// The asterisk after `function` means that
 // `objectEntries` is a generator
 function* objectEntries(obj) {
		 let propKeys = Object.keys(obj);

		 for (let propKey of propKeys) {
				 // `yield` returns a value and then pauses
				 // the generator. Later, execution continues
				 // where it was previously paused.
				 yield [propKey, obj[propKey]];
		 }
 }

let jane = { first: "Jane", last: "Doe" };
  for (let key of objectEntries(jane)) {
      console.log(`${key}`);
  }
