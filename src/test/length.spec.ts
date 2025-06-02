import { Length } from "../lib";

// Length value.
const length = new Length(10);

console.group('new Length(10)');
console.log(
  `max: `, length.max, // number | undefined
  `min: `, length.min, // number | undefined
  `value: `, length.length, // 10
);
console.groupEnd();

// Exact value.
const exact = new Length({value: 35});

console.group('new Length({value: 35})');
console.log(
  `max: `, exact.max, // number | undefined
  `min: `, exact.min, // number | undefined
  `value: `, exact.length, // 35
);
console.groupEnd();

// Min value.
const min = new Length({min: 27});

console.group('new Length({min: 27})');
console.log(
  `max: `, min.max, // number | undefined
  `min: `, min.min, // 27
  `value: `, min.length, // number | undefined
);
console.groupEnd();

// Max value.
const max = new Length({max: 42});

console.group('new Length({max: 42})');
console.log(
  `max: `, max.max, // 42
  `min: `, max.min, // number | undefined
  `value: `, max.length, // number | undefined
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
  `value: `, complete.length, // 50
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
  `value: `, setLength.length, // 20 of number | undefined
);

setLength.setLength(27);
console.log('setLength.setLength(27)');
console.log(
  `max: `, setLength.max, // number | undefined
  `min: `, setLength.min, // number | undefined
  `value: `, setLength.length, // 27 of number | undefined
);

setLength.setMin(27);
console.log('setLength.setMin(27)');
console.log(
  `max: `, setLength.max, // number | undefined
  `min: `, setLength.min, // 27 of number | undefined
  `value: `, setLength.length, // 27 of number | undefined
);

console.groupEnd();

describe('Length', () => {
  describe('constructor and getters', () => {
    it('should store exact value when constructed with a number', () => {
      const l = new Length(5);
      expect(l.length).toBe(5);
      expect(l.min).toBeUndefined();
      expect(l.max).toBeUndefined();
    });

    it('should store min and max when constructed with an object', () => {
      const l = new Length({ min: 3, max: 7 });
      expect(l.length).toBeUndefined();
      expect(l.min).toBe(3);
      expect(l.max).toBe(7);
    });

    it('should store only min or max if only one provided', () => {
      const l1 = new Length({ min: 2 });
      expect(l1.min).toBe(2);
      expect(l1.max).toBeUndefined();
      expect(l1.length).toBeUndefined();

      const l2 = new Length({ max: 8 });
      expect(l2.min).toBeUndefined();
      expect(l2.max).toBe(8);
      expect(l2.length).toBeUndefined();
    });

    it('should store value as object property when constructed with { value }', () => {
      const l = new Length({ value: 4 });
      expect(l.length).toBe(4);
      expect(l.min).toBeUndefined();
      expect(l.max).toBeUndefined();
    });

    it('should expose internal length property', () => {
      const l = new Length({ min: 1, max: 2, value: 3 });
      expect(typeof l.config).toBe('object');
      if (typeof l.config  === 'object') {
        expect(l.config.value).toBe(3);
        expect(l.config.min).toBe(1);
        expect(l.config.max).toBe(2);
      }
    });
  });

  describe('set, setMin, setMax, setLength, setMinMax', () => {
    it('should set min value', () => {
      const l = new Length();
      l.setMin(4);
      expect(l.min).toBe(4);
      expect(l.max).toBeUndefined();
    });

    it('should set max value', () => {
      const l = new Length();
      l.setMax(10);
      expect(l.max).toBe(10);
      expect(l.min).toBeUndefined();
    });

    it('should set value', () => {
      const l = new Length();
      l.setLength(8);
      expect(l.length).toBe(8);
    });

    it('should set min and max with setMinMax', () => {
      const l = new Length();
      l.setMinMax(2, 5);
      expect(l.min).toBe(2);
      expect(l.max).toBe(5);
    });

    it('should update min and max on existing range', () => {
      const l = new Length({ min: 1 as number, max: 2 as number });
      l.setMinMax(3, 7);
      expect(l.min).toBe(3);
      expect(l.max).toBe(7);
    });

    it('should set all properties with set', () => {
      const l = new Length();
      l.set({ min: 2 as number, max: 10 as number, value: 4 as number });
      expect(l.min).toBe(2);
      expect(l.max).toBe(10);
      expect(l.length).toBe(4);
    });

    it('should not set properties if not provided in set', () => {
      const l = new Length({ min: 1, max: 3 });
      l.set({}); // should not change anything
      expect(l.min).toBe(1);
      expect(l.max).toBe(3);
      expect(l.length).toBeUndefined();
    });

    it('should allow chaining of setters', () => {
      const l = new Length();
      l.setMin(1).setMax(5).setLength(3);
      expect(l.min).toBe(1);
      expect(l.max).toBe(5);
      expect(l.length).toBe(3);
    });
  });
});