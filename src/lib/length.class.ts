// Interface.
import { LengthOptions } from '@typedly/settings';
/**
 * @description Represents a length value with optional minimum and maximum constraints.
 * @export
 * @class Length
 * @template {number | undefined} [Value=number | undefined] 
 * @template {number | undefined} [Min=number | undefined] 
 * @template {number | undefined} [Max=number | undefined] 
 */
export class Length<
  Value extends number | undefined = number | undefined,
  Min extends number | undefined = number | undefined,
  Max extends number | undefined = number | undefined,
>  {

  public get length() {
    return this.#length;
  }

  public get max(): Max {
    return this.#length instanceof Object && 'max' in this.#length
      ? this.#length.max as Max
      : undefined as Max
  }

  public get min(): Min {
    return this.#length instanceof Object && 'min' in this.#length
      ? this.#length.min as Min
      : undefined as Min
  }

  public get value(): Value {
    return typeof this.#length === 'number'
      ? this.#length
      : typeof this.#length === 'object'
        ? this.#length.value as Value
        : undefined as Value;
  }

  #length: Value | LengthOptions<Value, Min, Max> | undefined;
  constructor(length?: Value | LengthOptions<Value, Min, Max>) {
    this.#length = length;
  }
  public set({ max, min, value }: LengthOptions<Value, Min, Max> = {}): this {
    'max' in arguments[0] && this.setMax(max);
    'min' in arguments[0] && this.setMin(min);
    'value' in arguments[0] && this.setLength(value);
    return this;
  }

  public setLength(value: Value | undefined): this {
    this.#length instanceof Object
      ? (this.#length.value = value)
      : this.#length = { value };
    return this;
  }

  public setMax(max: Max | undefined): this {
    this.#length instanceof Object
      ? (this.#length.max = max)
      : this.#length = { max };
    return this;
  }

  public setMin(min: Min | undefined): this {
    this.#length instanceof Object
      ? (this.#length.min = min)
      : this.#length = { min };
    return this;
  }

  public setMinMax(min: Min, max: Max): this {
    this.#length instanceof Object
      ? (this.#length.min = min, this.#length.max = max)
      : this.#length = { min, max };
    return this;
  }
}
