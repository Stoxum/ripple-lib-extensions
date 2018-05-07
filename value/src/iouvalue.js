/* @flow */

'use strict';

const Value = require('./value').Value;
const STMValue = require('./STMValue').STMValue;
const GlobalBigNumber = require('bignumber.js');
const BigNumber = GlobalBigNumber.another({
  ROUNDING_MODE: GlobalBigNumber.ROUND_HALF_UP,
  DECIMAL_PLACES: 40
});
const stoxumUnits = new BigNumber(1e6);

class IOUValue extends Value {

  constructor(value: string | BigNumber, roundingMode: ?number = null,
  base: ?number = null) {

    super(new BigNumber(value, base).toDigits(16, roundingMode));
  }

  multiply(multiplicand: Value) {
    if (multiplicand instanceof STMValue) {
      return super.multiply(
        new IOUValue(
          multiplicand._value.times(stoxumUnits)));
    }
    return super.multiply(multiplicand);
  }

  divide(divisor: Value) {
    if (divisor instanceof STMValue) {
      return super.divide(
        new IOUValue(divisor._value.times(stoxumUnits)));
    }
    return super.divide(divisor);
  }

  negate() {
    return new IOUValue(this._value.neg());
  }

  _canonicalize(value) {
    if (value.isNaN()) {
      throw new Error('Invalid result');
    }
    return new IOUValue(value.toPrecision(16));
  }

  equals(comparator) {
    return (comparator instanceof IOUValue)
      && this._value.equals(comparator._value);
  }
}

exports.IOUValue = IOUValue;
