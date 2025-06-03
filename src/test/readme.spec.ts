import { Length } from "../lib";

// Example 1: Exact value
const exactLength = new Length(5);
console.log(exactLength.length);  // 5
console.log(exactLength.min);    // undefined
console.log(exactLength.max);    // undefined

// Example 2: Min/Max range
const rangeLength = new Length({ min: 2, max: 10 });
console.log(rangeLength.length);  // undefined
console.log(rangeLength.min);    // 2
console.log(rangeLength.max);    // 10

// Example 3: Set min, max, and value dynamically
const flexibleLength = new Length();
flexibleLength.setMin(3).setMax(7);
console.log(flexibleLength.min); // 3
console.log(flexibleLength.max); // 7

flexibleLength.setLength(5);
console.log(flexibleLength.length); // 5

// Example 4: Use setMinMax and reset
flexibleLength.setMinMax(4, 8);
console.log(flexibleLength.min); // 4
console.log(flexibleLength.max); // 8

flexibleLength.setMinMax(undefined, undefined);
console.log(flexibleLength.min); // undefined
console.log(flexibleLength.max); // undefined
