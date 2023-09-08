import FixedDec, { Fixed } from '../FixedDec';

describe('Fixed decimal class', () => {
  it('wrong using', () => {
    expect(() => Fixed(0.1, -1)).toThrowError();
  })

  it('access by static function', () => {
    expect(Number(Fixed(0.1 + 0.2, 0))).toEqual(0);
    expect(Number(Fixed(0.1 + 0.2))).toEqual(0.3);
    expect(Number(Fixed(0.1 + 0.2, 4))).toEqual(0.3);
  })

  it('can be constructed from another instance', () => {
    const fixed = Fixed(0.12345, 4);
    expect(fixed.toString()).toBe('0.1235');
    expect(String(Fixed(fixed))).toBe('0.1235');
    expect(String(Fixed(fixed, 4))).toBe('0.1235');
    expect(String(Fixed(fixed, 5))).toBe('0.12350');
    expect(String(Fixed(fixed, 2))).toBe('0.12');
    expect(Fixed(fixed)).not.toBe(fixed);
  });

  it('can operate with negative values', () => {
    const fixed = Fixed(-0.12345, 4);
    expect(fixed.toString()).toBe('-0.1235');
    expect(String(Fixed(fixed))).toBe('-0.1235');
    expect(String(Fixed(fixed, 4))).toBe('-0.1235');
    expect(String(Fixed(fixed, 5))).toBe('-0.12350');
    expect(String(Fixed(fixed, 2))).toBe('-0.12');
    expect(Fixed(fixed)).not.toBe(fixed);
  })

  it('get number value', () => {
    expect(0.1 + 0.2).not.toBe(0.3)
    expect(Number(Fixed(0.1 + 0.2))).toBe(0.3);
    expect(Number(Fixed(0.1 + 0.2, 4))).toBe(0.3);
    expect(Fixed(1).valueOf() + 1).toBe(2);
  })

  it('get string value', () => {
    expect(String(new FixedDec(0))).toEqual('0.00');
    expect(String(new FixedDec(0, 4))).toEqual('0.0000');
    expect(String(new FixedDec(0.1 + 0.2))).toEqual('0.30');
    expect(String(new FixedDec(0.1 + 0.2, 4))).toEqual('0.3000');
  })

  it('template using', () => {
    expect(`${Fixed(0.1)}`).toBe('0.10');
  })

})