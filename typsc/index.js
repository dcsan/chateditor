"use strict";
console.log("welcome typescript");
function* objectEntries(obj) {
    let propKeys = Object.keys(obj);
    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
let jane = { first: "Jane", last: "Doe" };
for (let key of objectEntries(jane)) {
    console.log(`${key}`);
}
