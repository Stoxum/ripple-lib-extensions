/* @flow */

'use strict';

const GlobalBigNumber = require('bignumber.js');
const BigNumber = GlobalBigNumber.another({
  ROUNDING_MODE: GlobalBigNumber.ROUND_HALF_UP,
  DECIMAL_PLACES: 40
});

const Value = require('./value').Value;
const stoxumUnits = new BigNumber(1e6);

class STMValue extends Value {

  constructor(value: string | BigNumber) {
    super(value);
    if (this._value.dp() > 6) {
      throw new Error(
        'Value has more than 6 digits of precision past the decimal point, '
          + 'an IOUValue may be being cast to an STMValue'
        );
    }
  }

  multiply(multiplicand: Value) {
    if (multiplicand instanceof STMValue) {
      return super.multiply(
        new STMValue(multiplicand._value.times(stoxumUnits)));
    }
    return super.multiply(multiplicand);
  }

  divide(divisor: Value) {
    if (divisor instanceof STMValue) {
      return super.divide(
        new STMValue(divisor._value.times(stoxumUnits)));
    }
    return super.divide(divisor);
  }

  negate() {
    return new STMValue(this._value.neg());
  }

  _canonicalize(value) {
    if (value.isNaN()) {
      throw new Error('Invalid result');
    }
    return new STMValue(value.round(6, BigNumber.ROUND_DOWN));
  }

  equals(comparator) {
    return (comparator instanceof STMValue)
      && this._value.equals(comparator._value);
  }
}

exports.STMValue = STMValue;
