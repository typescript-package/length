import { Length } from "../lib";

// Length value.
const length = new Length(10);

console.group('new Length(10)');
console.log(
  `max: `, length.max, // number | undefined
  `min: `, length.min, // number | undefined
  `value: `, length.value, // 10
);
console.groupEnd();

// Exact value.
const exact = new Length({value: 35});

console.group('new Length({value: 35})');
console.log(
  `max: `, exact.max, // number | undefined
  `min: `, exact.min, // number | undefined
  `value: `, exact.value, // 35
);
console.groupEnd();

// Min value.
const min = new Length({min: 27});

console.group('new Length({min: 27})');
console.log(
  `max: `, min.max, // number | undefined
  `min: `, min.min, // 27
  `value: `, min.value, // number | undefined
);
console.groupEnd();

// Max value.
const max = new Length({max: 42});

console.group('new Length({max: 42})');
console.log(
  `max: `, max.max, // 42
  `min: `, max.min, // number | undefined
  `value: `, max.value, // number | undefined
);
console.groupEnd();

// Complete length
const complete = new Length({
  value: 50,
  min: 10,
  max: 100
});

console.group('new Length({value: 50, min: 10, max: 100})');
console.log(
  `max: `, complete.max, // 100
  `min: `, complete.min, // 10
  `value: `, complete.value, // 50
);
console.groupEnd();

// Set length
const setLength = new Length();

console.group(`new Length()`);
console.log('setLength.set({ value: 20 })');

setLength.set({ value: 20 });
console.log(
  `max: `, setLength.max, // number | undefined
  `min: `, setLength.min, // number | undefined
  `value: `, setLength.value, // 20 of number | undefined
);

setLength.setLength(27);
console.log('setLength.setLength(27)');
console.log(
  `max: `, setLength.max, // number | undefined
  `min: `, setLength.min, // number | undefined
  `value: `, setLength.value, // 27 of number | undefined
);

setLength.setMin(27);
console.log('setLength.setMin(27)');
console.log(
  `max: `, setLength.max, // number | undefined
  `min: `, setLength.min, // 27 of number | undefined
  `value: `, setLength.value, // 27 of number | undefined
);

console.groupEnd();
