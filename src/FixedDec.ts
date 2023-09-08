import { DEFAULT_PRECISION } from './constants';

class FixedDecClass {
  #sign: number;
  #value: bigint;
  #precision: number;
  #scale: bigint;

  private constructFromNumber(value: number, precision: number) {
    const scale = Math.pow(10, precision);
    const absValue = Math.abs(value);

    this.#sign = Math.sign(value);
    this.#precision = Math.trunc(precision);
    this.#value = BigInt(Math.round(absValue * scale));
    this.#scale = BigInt(scale);
  }

  constructor(value: number | FixedDecClass, precision?: number) {
    if (precision < 0) {
      throw new Error('Wrong precision has been defined');
    }

    if (typeof value === 'number') {
      this.constructFromNumber(value, precision ?? DEFAULT_PRECISION)
    }
    if (typeof value === 'object') {
      this.#value = value.#value;
      if (!precision) {
        this.#sign = value.#sign;
        this.#precision = value.#precision;
        this.#scale = value.#scale;
      } else {
        this.constructFromNumber(value.valueOf(), precision);
      }
    }
  }

  public valueOf(): number {
    return Number(this.#value) / Number(this.#scale) * this.#sign;
  }

  toString(): string {
    const sign = this.#sign < 0 ? '-' : '';
    const natural = String(this.#value / this.#scale);
    const fractional = String(this.#value % this.#scale).padEnd(this.#precision, '0');

    return `${sign}${natural}.${fractional}`;
  }

  toEqual(value: FixedDecClass): boolean {
    return this.#value === value.#value && this.#scale === value.#scale;
  }
}

export function Fixed(value: number | FixedDecClass, precision?: number) {
  return new FixedDecClass(value, precision);
}

export default FixedDecClass;
