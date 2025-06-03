// Interface.
import { LengthOptions, LengthSettings } from '@typedly/length';
/**
 * @description Represents a length value with optional minimum and maximum constraints.
 * @export
 * @class Length
 * @template {number | undefined} [Value=number | undefined] The type of the length value, which can be a number or undefined.
 * @template {number | undefined} [Min=number | undefined] The type of the minimum length value, which can be a number or undefined.
 * @template {number | undefined} [Max=number | undefined] The type of the maximum length value, which can be a number or undefined.
 */
export class Length<
  Value extends number | undefined = number | undefined,
  Min extends number | undefined = number | undefined,
  Max extends number | undefined = number | undefined,
>  {
  /**
   * @description The length value of generic type variable `Value`.
   * @public
   * @readonly
   * @type {Value }
   */
  public get length(): Value {
    return this.#value;
  }

  /**
   * @description The maximum length value of generic type variable `Max`.
   * @public
   * @readonly
   * @type {Max}
   */
  public get max(): Max {
    return this.#max;
  }

  /**
   * @description The minimum length value of generic type variable `Min`.
   * @public
   * @readonly
   * @type {Min}
   */
  public get min(): Min {
    return this.#min;
  }

  /**
   * @description The configuration object containing the length, minimum, and maximum values.
   * @public
   * @readonly
   * @type {LengthSettings<Value, Min, Max>}
   */
  public get config(): LengthSettings<Value, Min, Max> {
    return {
      value: this.#value,
      min: this.#min,
      max: this.#max,
    };
  }

  
  /**
   * @description Privately stored maximum length value of generic type variable `Max`.
   * @type {Max}
   */
  #max: Max;

  /**
   * @description Privately stored minimum length value of generic type variable `Min`.
   * @type {Min}
   */
  #min: Min;

  /**
   * @description Privately stored length value of generic type variable `Value`.
   * @type {Value}
   */
  #value: Value;

  /**
   * Creates an instance of `Length`.
   * @constructor
   * @param {?(Value | LengthOptions<Value, Min, Max>)} [length] The initial length value, which can be a number or an object containing min, max, and value properties.
   */
  constructor(length?: Value | LengthOptions<Value, Min, Max>) {
    this.#value = typeof length === 'number'
      ? length
      : typeof length === 'object' ? length.value as Value : undefined as Value;
    this.#max = typeof length === 'object' && 'max' in length ? length.max as Max : undefined as Max;
    this.#min = typeof length === 'object' && 'min' in length ? length.min as Min : undefined as Min;
  }

  /**
   * @description Checks whether the length is valid based on the defined minimum and maximum constraints.
   * @public
   * @returns {boolean} Returns the true if the length is valid, otherwise false.
   */
  public isValid(): boolean {
    if (typeof this.length === 'number') {
      if (typeof this.min === 'number' && this.length < this.min) return false;
      if (typeof this.max === 'number' && this.length > this.max) return false;
    }
    return true;
  }

  /**
   * @description Sets the length, minimum, and maximum values.
   * @public
   * @param {LengthOptions<Value, Min, Max>} [param0={}] 
   * @param {LengthOptions<Value, Min, Max>} param0.max Optional maximum length value.
   * @param {LengthOptions<Value, Min, Max>} param0.min Optional minimum length value.
   * @param {LengthOptions<Value, Min, Max>} param0.value Optional length value.
   * @returns {this} The current instance of Length.
   */
  public set({ max, min, value }: LengthOptions<Value, Min, Max> = {}): this {
    'max' in arguments[0] && this.setMax(max);
    'min' in arguments[0] && this.setMin(min);
    'value' in arguments[0] && this.setLength(value);
    return this;
  }

  /**
   * @description Sets the length value.
   * @public
   * @param {(Value | undefined)} value The length value to set.
   * @returns {this} The current instance of Length.
   */
  public setLength(value: Value | undefined): this {
    this.#value = value as Value;
    return this;
  }

  /**
   * @description Sets the maximum length value.
   * @public
   * @param {(Max | undefined)} max The maximum length value to set.
   * @returns {this} The current instance of Length.
   */
  public setMax(max: Max | undefined): this {
    this.#max = max as Max;
    return this;
  }

  /**
   * @description Sets the minimum length value.
   * @public
   * @param {(Min | undefined)} min The minimum length value to set.
   * @returns {this} The current instance of Length.
   */
  public setMin(min: Min | undefined): this {
    this.#min = min as Min;
    return this;
  }

  /**
   * @description Sets both the minimum and maximum length values.
   * @public
   * @param {Min | undefined} min The minimum length value to set.
   * @param {Max | undefined} max The maximum length value to set.
   * @returns {this} The current instance of Length.
   */
  public setMinMax(min: Min | undefined, max: Max | undefined): this {
    this.setMax(max).setMin(min);
    return this;
  }
}
